const db = require('../database/models');
const { Op } = require("sequelize");
const {validationResult} = require("express-validator");


let adminController = {
    list: function (req,res){
        
        db.Products.findAll( 
            {include: [ {association:"modelo"}]})
            .then(function(products)
           {
            res.render("admin", { products:products })
        }
        )
    },
    
    detail: (req,res)=>{
        db.Products.findByPk(req.params.id, {
            include: [{association: "modelo"},{association:"colours"}]
        })
        .then(function(product){
            res.render("productDetail",{product})
        })   
    },
    create: async function (req, res, next ){
       
        res.render("product-add-form");
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

        res.redirect("/productDetail", {product});
    },
    
    }

module.exports= adminController;
