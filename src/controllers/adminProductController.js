const fs = require("fs");
const path = require("path");

function findAll(){
  //leer el json
  let productsJson= fs.readFileSync(path.join(__dirname, "../data/products.json"))

  //parsear la inform
  let data = JSON.parse(productsJson)
  return data
}

function writeJson(array){
  //transformamos en un string
  let arrayJson = JSON.stringify(array);
  
  //procesamos la inform en el Json
  return fs.writeFileSync(path.join(__dirname, "../data/products.json"), arrayJson);

}

const adminProductController={
    entrarAdminProduct:(req,res)=>{
        res.render("adminProduct")    
    },
    entrarAdminAddProduct: (req,res)=>{
        res.render("adminAddProduct")
    },
    entrarAdminModProduct: (req,res)=>{
        res.render("adminModProduct")
    },
    crearAdminAddProduct: (req,res)=>{
        res.render("adminAddProduct")
    },
    editarAdminModProduct: (req,res)=>{
        res.render("adminModProduct")
    },
    borrarAdminAddProduct: (req,res)=>{
        res.render("adminProduct")
    },
}
module.exports= adminProductController;


