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
            .then(function([user, categorias]){
                res.render("user-edit-form",{user, categorias})
            })
        
        
    },
    update: (req,res)=>{
        db.Users.update(
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
            }, {
                where: {
                    id: req.params.id
                }
            });
            
            res.redirect("/adminUser");
        },

    destroy: (req,res)=>{
        db.Users.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect("/adminUser")
    },
}
module.exports= userController;
