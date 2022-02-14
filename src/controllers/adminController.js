const db = require('../database/models');
const { Op } = require("sequelize");
const {validationResult} = require ('express-validator')

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
        
        db.Marcas.findAll({
            include: "productos"}) 
        .then(function(marcas){
            return res.render("product-add-form", {marcas:marcas})
        })
    },
    
    store: async function(req, res){
        let marcas= await db.Marcas.findAll({
            include: "productos"}) 
            const errores = validationResult(req);
            if(!errores.isEmpty())
            {
                return res.render("product-add-form", {
                    errores: errores.errors,
                    oldData: req.body,
                    marcas: marcas
                })}
                
        await db.Products.create(
        {
          nombre: req.body.nombre ,
          descripcion: req.body.descripcion,
          unidades: req.body.unidades ,
          foto: req.file.filename,
          precio: req.body.precio,
          marca_id:req.body.marca
          
        })

        res.redirect("/admin");
    },
    
    
    
    edit: (req,res)=>{
        const errores = validationResult(req);
        let marcas= db.Marcas.findAll({
            include: "productos"})
        if(!errores.isEmpty()){
            return res.render("product-add-form", {
                errores: errores.errors,
                oldData: req.body,
                marcas: marcas
            })
    
        }else{
        let pedidoProducto=db.Products.findByPk(req.params.id,{
            include: [{association: "marca"},{association:"colours"}]
        })
         
        let pedidoMarcas= db.Marcas.findAll()
        let pedidoColores= db.Colours.findAll()
       Promise.all([pedidoProducto,pedidoMarcas,pedidoColores])
     
        .then(function(values)
        { 
        res.render("product-edit-form",{product: values[0], marcas: values[1], colours: values[2]})
       
        })  } 

    },

        update: (req,res)=>{
            db.Products.findAll(
                {include:["colours", "marca"]}
            )
            db.Products.update(
                {
                  nombre: req.body.nombre ,
                  descripcion: req.body.descripcion,
                  unidades: req.body.unidades,
                  precio: req.body.precio,
                  marca_id:req.body.marca
                }, {
                    where: {
                        id: req.params.id
                    }
                },
                {include:["colours"]}
                );
                res.redirect("/admin");
            },
        destroy: async (req,res)=>{
            await db.Products.update (
             {
                nombre: req.body.nombre ,
                descripcion: req.body.descripcion,
                unidades: 0,
                precio: req.body.precio,
                marca_id:req.body.marca,
                borrado:1,
              }, {
                  where: {
                      id: req.params.id
                  }
              }),

          await db.Products.softDelete({ where: { borrado: 1 } })
          res.redirect("/admin")

        },

        listaBorrados: async (req,res)=> {
            let pedidoUsers= db.Users.findAll({
                include:[{association:"categoria"}, {association:"items2"}],
                
                where: {
                    borrado:1 }
                    
            })
            let pedidoProductos= db.Products.findAll({
            include:[{association:"marca"}],
            
            where: {
                borrado:1 }
                
        })
       Promise.all([pedidoProductos,pedidoUsers])
     
        .then(function(values)
        { 
        res.render("adminBorrado",{products: values[0], users: values[1],})
       
        })   

      
          
    },

    restore: async (req,res)=>{
        await db.Products.update (
         {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            unidades: 1,
            precio: req.body.precio,
            marca_id:req.body.marca,
            borrado:0,
          }, {
              where: {
                  id: req.params.id,
                  borrado: 1
              }
              
          })
          res.redirect ("/admin")
        },
}

module.exports= adminController;

