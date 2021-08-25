const fs = require("fs");
const path = require("path");

function findAll(){
    //leer el json
    let tablasJson= fs.readFileSync(path.join(__dirname, "../data/tablas.json"))
  
    //parsear la inform
    let data = JSON.parse(tablasJson)
    return data
  }
  //actualizar json
  function writeJson(array){
    //leer el json

    let arrayJson= JSON.stringify(array);
    return fs.writeFileSync(path.join(__dirname, "../data/tablas.json", arrayJson))
  }

  const productController={
    list:(req,res)=>{
        let tablas=findAll();       
        res.render("product", {tablas})    
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
        let nuevaTabla={
            id:tablas.length+1,
            name:req.body.name,
            modelo:req.body.modelo,
            precio:req.body.precio,
            descripcion:req.body.descripcion,
            color:req.body.color,
            foto:req.body.foto
        }
        let tablasActualizadas=[...tablas,nuevaTabla]
        writeJson(tablasActualizadas);

        res.redirect("/product/list")
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
                tabla.descripcion=req.body.descripcion
                tabla.color=req.body.color
                tabla.foto=req.body.foto
            }
            return tabla
        })
        writeJson(tablasActualizadas);
        res.redirect("product/:req.params.id")
    },
    destroy: (req,res)=>{
        let tablas = findAll();
        let tablasNoBorradas= tablas.filter(function(tabla){
            return tabla.id !=req.params.id
        })
        writeJson(tablasNoBorradas);
        res.redirect("product/list")
    },
}
module.exports= productController;
