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
        let pedidoProducto=db.Products.findByPk(req.params.id,{
            include: [{association: "marca"},{association:"colours"}]
        })
         
        let pedidoMarcas= db.Marcas.findAll()
        let pedidoColores= db.Colours.findAll()
       Promise.all([pedidoProducto,pedidoMarcas,pedidoColores])
     
        .then(function(values)
        { 
<<<<<<< HEAD
        return res.send(values[0])
=======
            return res.send(values[0])
>>>>>>> 4486daa8ecc7189a0c9cdc09273795a64f0447ae
        res.render("product-edit-form",{product: values[0], marcas: values[1], colours: values[2]})
       
        })   

    },

        update: (req,res)=>{
            db.Products.update(
                {
                  nombre: req.body.nombre ,
                  descripcion: req.body.descripcion,
                  unidades: req.body.unidades,
                  precio: req.body.precio,
                  marca:req.body.marca
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

