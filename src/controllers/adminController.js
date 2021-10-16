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
    
    detail: async function (req, res, next ){
        let tabla = await db.Products.findByPk(req.params.id, {
            include:["colors", "models"]
        })
        if(productFound){
            res.render("productDetail", { tabla});
        }else{
            res.render("productDetail", { alert: true });
        }
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
          modelo_id:req.body.modelo_id
          
        })

        res.redirect("/admin");
    },
    
    }

module.exports= adminController;

