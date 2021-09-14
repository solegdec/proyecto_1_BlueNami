const fs = require("fs");
const path = require("path");

function findAll(){
    
    let usersJson = fs.readFileSync(path.join(__dirname, "../data/users.json"))
    let data = JSON.parse(usersJson)
    return data
  }
 
  function writeJson(array){
    let arrayJson= JSON.stringify(array);
    return fs.writeFileSync(path.join(__dirname, "../data/users.json"),arrayJson)
  }

  const userController={
    list:(req,res)=>{
        let users=findAll();       
        res.render("adminUsers", {users})    
    },
    profile: (req,res)=>{
        let users = findAll();
        let userEncontrado= users.find(function(user){
            return user.id==req.params.id
        })
        res.render("profile",{user:userEncontrado})
    },
    create: (req,res)=>{
        res.render("user-add-form")
    },
    store: function(req, res){
        let users = findAll()
        let userId = users.length === 0 ? 1 :  users[users.length-1].id + 1
        let nuevoUser = {
          id: userId ,
          nombre: req.body.nombre ,
          genero: req.body.genero,
          fechaNac: req.body.fechaNac ,
          pais: req.body.pais ,
          apellido: req.body.apellido ,
          email: req.body.email ,
          contraseña: req.body.contraseña
          
        }
        let usersActualizados = [...users, nuevoUser]
        writeJson(usersActualizados);

        res.redirect("/adminuser");
    },
    edit: (req,res)=>{
        let users = findAll();
        let userEncontrado=users.find(function(user){
            return user.id==req.params.id
        })
        res.render("user-edit-form",{user : userEncontrado})
    },
    update: (req,res)=>{
        let users = findAll();
        let usersActualizados= users.map(function(user){
            if (user.id == req.params.id){
                user.nombreCompleto=req.body.nombreCompleto
                user.genero=req.body.genero
                user.email=req.body.email  
            }
            return user
        })
        writeJson(usersActualizados);
        res.redirect("/adminUser")
    },
    destroy: (req,res)=>{
        let users = findAll();
        let usersNoBorrados= users.filter(function(user){
            return user.id !=req.params.id
        })
        writeJson(usersNoBorrados);
        res.redirect("/adminUser")
    },
}
module.exports= userController;
