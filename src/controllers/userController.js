const fs = require("fs");
const path = require("path");

function findAll(){
    
    let usersJson = fs.readFileSync(path.join(__dirname, "../data/users.json"))
    let data = JSON.parse(usersJson)
    return data
  }
 
  function writeJson(array){
    let arrayJson= JSON.stringify(array);
    return fs.writeFileSync(path.join(__dirname, "../data/users.json",arrayJson))
  }

  const userController={
    list:(req,res)=>{
        let users=findAll();       
        res.render("adminUsers", {users})    
    },
    /*detail: (req,res)=>{
        let users = findAll();
        let userEncontrado= users.find(function(user){
            return user.id==req.params.id
        })
        res.render("adminUsers",{user:userEncontrado})
    },*/
    create: (req,res)=>{
        res.render("user-add-form")
    },
    store: function(req, res){
        
        let users = findAll()
    
        
        let nuevoUser = {
          id: users.length + 1 ,
          nombreCompleto: req.body.nombreCompleto ,
          genero: req.body.genero,
          email: req.body.email ,
          
        }
        let usersActualizados = [...users, nuevoUser]
        writeJson(usersActualizados);

        //devuelvo una respuesta
        res.redirect("adminUsers");
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
                user.genero=req.body.genero
                user.email=req.body.email
               
            }
            return user
        })
        writeJson(usersActualizados);
        res.redirect("/adminUsers/"+ req.params.id)
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
