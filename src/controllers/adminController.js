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
          foto: req.file.filename,
          precio: req.body.precio,
          modelo_id:req.body.modelo
          
        })

        res.redirect("/admin");
    },
    
    edit: (req,res)=>{
        db.Products.findByPk(req.params.id,{
            include: [{association: "modelo"}]
        })
        .then(function(product){
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

module.exports= adminController;

