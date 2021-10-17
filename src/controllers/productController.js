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
    edit: async (req,res)=>{

        let pedidoProducto = await db.Products.findByPk(req.params.id,{
            include: [{association: "modelo"}]
        });

        
        Promise.all([pedidoProducto])
            .then(function([product]){
            res.render("product-edit-form",{product})
            })
        
        
    },
    update: (req,res)=>{
        db.Products.update(
            {
              nombre: req.body.nombre ,
              descripcion: req.body.descripcion,
              unidades: req.body.unidades,
              precio: req.body.precio,
            }, {
                where: {
                    id: req.params.id
                }
            });
            
            res.redirect("/admin");
        },

    destroy: (req,res)=>{        
        db.Products.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect("/admin")
    },
}
module.exports= productController;
