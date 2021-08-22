const fs = require("fs");
const path = require("path");

function findAll(){
  //leer el json
  let usersJson= fs.readFileSync(path.join(__dirname, "../../data/users.json"))

  //parsear la inform
  let data = JSON.parse(usersJson)
  return data
}

function writeJson(array){
  //transformamos en un string
  let arrayJson = JSON.stringify(array);
  
  //procesamos la inform en el Json
  return fs.writeFileSync(path.join(__dirname, "../../data/users.json"), arrayJson);

}


const adminUserController={
    entrarAdminUser:(req,res)=>{
        res.render("adminUser")
        
    },
    entrarAdminAddUser:(req,res)=>{
        res.render("adminAddUser")
        
    },

    entrarAdminModUser:(req,res)=>{
        res.render("adminModUser")
        
    },
    editarAdminAddUser:(req,res)=>{
        res.render("adminModUser")
        
    },
    crearAdminAddUser:(req,res)=>{
        res.render("adminAddUser")
        
    },
    borrarAdminModUser:(req,res)=>{
        res.render("adminUser")
        
    }

}
module.exports= adminUserController;

