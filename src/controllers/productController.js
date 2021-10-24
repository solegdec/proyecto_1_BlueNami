const db = require('../database/models');
const { Op } = require("sequelize");
const {validationResult} = require("express-validator")

  
  let productController={
    list: (req, res) => {
        db.Products.findAll(
            { include: ['marca']}
        )
            .then(products => {
                res.render('product', {products})
            })
        
    },
    
    detail: async (req,res)=>{
        await db.Products.findByPk(req.params.id, {
            include: [{association: "marca"},{association:"colours"}]
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
        db.Marcas.findAll() 
        .then(function(marcas){
            return res.render("product-add-form", {marcas})
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
            include: [{association: "marca"}]
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
              marca:req.body.marca,
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
