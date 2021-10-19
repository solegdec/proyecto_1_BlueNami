const db = require('../database/models');
const { Op } = require("sequelize");
const {validationResult} = require("express-validator");
//controller de productos desde admin

let adminController = {
    list: function (req,res){
        
        db.Products.findAll( 
            {include: [ {association:"marca"}]})
            .then(function(products)
           {
            res.render("admin", { products:products })
        }
        )
    },
    
    detail: async function (req, res, next ){
        let tabla = await db.Products.findByPk(req.params.id, {
            include:["colors", "marcas"]
        })
        if(productFound){
            res.render("productDetail", { tabla});
        }else{
            res.render("productDetail", { alert: true });
        }
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
          foto: req.file.filename,
          precio: req.body.precio,
          marca_id:req.body.marca
          
        })

        res.redirect("/admin");
    },
    
    edit: (req,res)=>{
        db.Products.findByPk(req.params.id,{
            include: [{association: "marca"}]
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

