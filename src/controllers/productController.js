const db = require('../database/models');
const { Op } = require("sequelize");
const {validationResult} = require("express-validator")

  
  let productController={
    list: (req, res) => {
        db.Products.findAll(
            { include: ['modelo']}
        )
            .then(products => {
                res.render('product', {products})
            })
        
    },
    
    detail: (req,res)=>{
        db.Products.findByPk(req.params.id, {
            include: [{association: "modelo"},{association:"colours"}]
        })
        .then(function(product){
            res.render("productDetail",{product})
        })   
    
    
    },
    buscar: (req,res)=> {
       
        db.Products.findAll({

            where: {
                nombre: { [Op.like]: '%' + req.query.search + '%' }
            }
        })
     
        .then(products=>{
            res.render("product",{products})
        })
        .catch(err=>{res.send(err)})
    },

    create: (req,res)=>{
        db.Models.findAll() 
        .then(function(modelos){
            return res.render("product-add-form", {modelos})
        })
    },

    store: function(req, res){
        db.Products.create(
        {
          nombre: req.body.nombre ,
          descripcion: req.body.descripcion,
          unidades: req.body.unidades,
          foto: req.body.foto,
          precio: req.body.precio,
          
        })

        res.redirect("/product");
    },
    edit: (req,res)=>{
        let pedidoProducto = db.Products.findByPk(req.params.id,{
            include: [{association: "modelo"},{association:"colores"}]
        });
        let pedidoModelos = db.Models.findAll();
        let pedidoColores = db.Colours.findAll();
        
        Promise.all([pedidoProducto, pedidoModelos, pedidoColores])
            .then(function([producto, modelo, color]){
                res.render("product-edit-form",{producto, modelo, color})
            })
        
        
    },
    
    update: (req,res)=>{
        db.Products.update(
            {
              nombre: req.body.nombre ,
              descripcion: req.body.descripcion,
              unidades: req.body.unidades,
              foto: req.body.foto,
              precio: req.body.precio,
            }, {
                where: {
                    id: req.params.id
                }
            });
            
            res.redirect("/product");
        },

    destroy: (req,res)=>{
        db.Products.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect("/product")
    },
}
module.exports= productController;
