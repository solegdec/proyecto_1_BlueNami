const fs = require("fs");
const path = require("path");

function findAll(){
    //leer el json
    let usersJson= fs.readFileSync(path.join(__dirname, "../data/users.json"))
  
    //parsear la inform
    let data = JSON.parse(usersJson)
    return data
  }
  //actualizar json
  function writeJson(array){
    //leer el json

    let arrayJson= JSON.stringify(array);
    return fs.writeFileSync(path.join(__dirname, "../data/users.json", arrayJson))
  }

const userController={
    list:(req,res)=>{
        let users=findAll();       
        res.render("adminUsers", {users})    
    },
    detail: (req,res)=>{
        let users = findAll();
        let userEncontrado= users.find(function(user){
            return user.id==req.params.id
        })
        res.render("adminUsers",{user:userEncontrado})
    },
    create: (req,res)=>{
        res.render("user-add-form")
    },
    store: function(req, res){
        //busco todos los autos
        let users = findAll()
    
        //creo un nuevo auto
        let nuevoUser = {
          id: users.length + 1 ,
          nombreCompleto: req.body.nombreCompleto ,
          genero: req.body.genero,
          email: req.body.email ,
          
        }
        let usersActualizados = [...users, nuevoUser]
        writeJson(usersActualizados);

        //devuelvo una respuesta
        res.redirect("/adminUsers/list");
    },
    edit: (req,res)=>{
        let users = findAll();
        let userEncontrado=users.find(function(user){
            return user.id==req.params.id
        })
        res.render("user-edit-form",{user:userEncontrado})
    },
    update: (req,res)=>{
        let users = findAll();
        let usersActualizados= users.map(function(user){
            if (user.id == req.params.id){
                user.name=req.body.name
                //tabla.modelo=req.body.modelo
                //tabla.precio=req.body.precio
                user.genero=req.body.genero
                user.email=req.body.email
               //user.foto=req.body.foto
            }
            return user
        })
        writeJson(usersActualizados);
        res.redirect("adminUsers/:req.params.id")
    },
    destroy: (req,res)=>{
        let users = findAll();
        let usersNoBorrados= users.filter(function(user){
            return user.id !=req.params.id
        })
        writeJson(usersNoBorrados);
        res.redirect("adminUsers/list")
    },
}
module.exports= userController;
