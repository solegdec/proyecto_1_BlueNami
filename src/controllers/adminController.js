let db = require('../database/models')

let adminController = {
    crear: function (req,res){
        
        db.Models.findAll()
        .then(function(modelos){
            return res.render("product-add-form", {modelos} )});
        
            db.Colours.findAll()
        .then(function(colores){
            return res.render("product-add-form", {colores} )});
    },
}
        
    








/*
const fs = require("fs");
const path = require("path");

function findAll(){
   let tablasJson= fs.readFileSync(path.join(__dirname, "../data/tablas.json"))
    let data = JSON.parse(tablasJson)
    return data
  }

function writeJson(array){
    let arrayJson= JSON.stringify(array);
    return fs.writeFileSync(path.join(__dirname, "../data/tablas.json"), arrayJson)
}

    
    const adminController={
        list:(req,res)=>{
            let tablas=findAll();       
            res.render("admin", {tablas})    
        },
        detail: (req,res)=>{
            let tablas = findAll();
            let tablaEncontrada= tablas.find(function(tabla){
                return tabla.id==req.params.id
            })
            res.render("productDetail",{tabla:tablaEncontrada})
        },
        create: (req,res)=>{
    
            res.render("product-add-form")
        },
        store: (req,res)=>{
            let tablas = findAll();
            let tablaId = tablas.length === 0 ? 1 :  tablas[tablas.length-1].id + 1
            let nuevaTabla={
                id:tablaId,
                name:req.body.name,
                modelo:req.body.modelo,
                precio:req.body.precio,
                descripcion:req.body.descripcion,
                color:req.body.color,
                unidades:req.body.unidades,
                foto:req.file.filename
                
            }
            let tablasActualizadas=[...tablas,nuevaTabla]
            writeJson(tablasActualizadas);
    
            res.redirect("/admin")
        },
        edit: (req,res)=>{
            let tablas = findAll();
            let tablaEncontrada=tablas.find(function(tabla){
                return tabla.id==req.params.id
            })
            res.render("product-edit-form",{tabla:tablaEncontrada})
        },
        update: (req,res)=>{
            let tablas = findAll();
            let tablasActualizadas= tablas.map(function(tabla){
                if (tabla.id == req.params.id){
                    tabla.name=req.body.name
                    tabla.modelo=req.body.modelo
                    tabla.precio=req.body.precio
                    tabla.color=req.body.color
                    tabla.descripcion=req.body.descripcion
                    tabla.unidades=req.body.unidades
                    
                   
                }
                return tabla
            })
            writeJson(tablasActualizadas);
            res.redirect("/admin")
        },
        destroy: (req,res)=>{
            let tablas = findAll();
            let tablasNoBorradas= tablas.filter(function(tabla){
                return tabla.id !=req.params.id
            })
            writeJson(tablasNoBorradas);
            res.redirect("/admin")
        },
        
        
    }

    */
module.exports= adminController;
