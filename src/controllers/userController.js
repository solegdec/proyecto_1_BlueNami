const db = require('../database/models')


  
  let userController={
    list:(req,res)=>{
        db.Users.findAll(function(users){
            res.render("adminUsers", {users})  
        })      
          
    },
    profile: (req,res)=>{
        db.Users.findByPk(req.params.id, {
            include: [{association: "categorias"}]
        })
        .then(function(user){
            res.render("profile",{user})
        })   
    },

    create: (req,res)=>{
        db.Categories.findAll() 
        .then(function(categorias){
            return res.render("user-add-form", {categorias})
        })
    },

    store: function(req, res){
        db.Users.create(
        {
          nombre: req.body.nombre ,
          apellido: req.body.apellido,
          categoria: req.body.categoria,
          fechaNac: req.body.fechaNac,
          genero: req.body.genero,
          pais: req.body.pais,
          email: req.body.email,
          contraseña: req.body.contraseña,
          avatar: req.file.filename,
        })

        res.redirect("/adminuser");
    },
    edit: (req,res)=>{
        let pedidoUsuario = db.Users.findByPk(req.params.id);
        let pedidoCategoria = db.Categories.findAll();
        
        Promise.all([pedidoUsuario, pedidoCategoria])
            .then(function([users, categorias]){
                res.render("user-edit-form",{users, categorias})
            })
        
        
    },
    update: (req,res)=>{
        let users = findAll();
        let usersActualizados= users.map(function(user){
            if (user.id == req.params.id){
                user.nombre=req.body.nombre
                user.apellido=req.body.apellido
                user.email=req.body.email 
                user.fechaNac=req.body.fechaNac 
                user.genero=req.body.genero
                user.email=req.body.email 
                user.pais=req.body.pais

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
