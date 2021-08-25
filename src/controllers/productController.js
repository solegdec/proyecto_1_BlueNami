const fs = require("fs");
const path = require("path");

function findAll(){
    //leer el json
    let tablasJson= fs.readFileSync(path.join(__dirname, "../data/tablas.json"))
  
    //parsear la inform
    let data = JSON.parse(tablasJson)
    return data
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
}

module.exports = productController;
