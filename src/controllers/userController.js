const db = require('../database/models');
const { Op } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const {validationResult} = require ('express-validator')
const Users = require('../database/models/Users.js')




//controlador de usuarios desde admin
  let userController={
    list: function (req,res){
        
        db.Users.findAll( 
            {include: [ {association:"categoria"}]})
            .then(function(users)
           {
            res.render("adminUsers", { users:users })
        }
        )
    },
    
    profile: (req,res)=>{
        db.Users.findByPk(req.params.id, {
            include: [{association: "categoria"}]
        })
        .then(function(user){
            res.render("profile",{user})
        })   
    },
    

    create: (req,res)=>{
        db.Categories.findAll() 
        .then(function(categorias){
            return res.render("user-add-form", {categorias:categorias})
        })
    },

    store: function(req, res){
        

        const errores = validationResult(req);
            if(!errores.isEmpty()){
                return res.render("user-add-form", {
                    errores: errores.errors,
                    oldData: req.body
                })
        
            }
        db.Users.create(
        {
          nombre: req.body.nombre ,
          apellido: req.body.apellido,
          categoria_id: 1,
          fechaNac: req.body.fechaNac,
          genero: req.body.genero,
          pais: req.body.pais,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          avatar:req.file.filemane
        }
        )
    .then(function(){
        return res.redirect("/adminUser");
    })

      
    },
    edit: async (req,res)=>{
        let pedidoUsuario = await db.Users.findByPk(req.params.id,{
            include: [{association: "categoria"}]
        });
        let pedidoCategorias = await db.Categories.findAll();
        
        Promise.all([pedidoUsuario, pedidoCategorias])
            .then(function([user, categorias]){
                res.render("user-edit-form",{user, categorias})
            })
          
    },
    update: (req,res)=>{
        db.Users.update(
            {
              nombre: req.body.nombre ,
              apellido: req.body.apellido,
              categoria_id: req.body.categoria,
              fechaNac: req.body.fechaNac,
              genero: req.body.genero,
              email: req.body.email,
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
