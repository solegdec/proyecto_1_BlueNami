const Users = require('../database/models/Users.js')
const bcrypt = require('bcryptjs');
const {validationResult} = require ('express-validator')
const db = require('../database/models');
const { Op } = require("sequelize");

/*
    Minimo 8 caracteres
    maximo 15 -Al menos una letra mayúscula-Al menos una letra minucula- Al menos un dígito- No espacios en blanco -Al menos 1 caracter especial
*/

//controller de clientes login/register


const clientController = {
    register: (req, res) => {
        res.render('register');
    },
    processRegister:(req, res, next) => {
            const errores = validationResult(req);
            if(!errores.isEmpty()){
                return res.render("register", {
                    errores: errores.errors,
                    old: req.body
                })
            };
            db.Users.create({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                genero:req.body.genero,
                pais:req.body.pais,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                fechaNac: req.body.fechaNac,
                avatar: req.file.filename,
                categoria_id: 1
             
            }).then(function(){
                return res.redirect("/client/login");
            })
        },
    
    login: (req, res)=>{
        res.render('login');
    },
    processLogin: (req, res, next) => {
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            return res.render("login", { 
                errors: errors.errors,
                old: req.body 
            });
        }
        db.Users.findOne({
            where: {
                email: req.body.email 
            }
        }).then( users => {
            req.session.userLogged = users;
            if(req.body.remember_user){
                res.cookie("remember_user", users.id, { maxAge: 60000 * 60 * 24 })
            }
            return res.redirect("/client/profile/");
        })  
    },
    
    profile: (req, res)=>{
        res.render('profile',{
         user:req.session.userLogged   
        });
    },
    account: function(req,res) {          
        if(req.session.userLogged){;
           if(req.session.userLogged.admin){
               return res.render('admin', {usuario:req.session.userLogged})
            }else{
                return res.render('profile', {usuario:req.session.userLogged})
            } 
        }
       
       else{return res.redirect('/users/login')} 
        
    },
    
    logout: function(req, res){
        req.session.destroy();
        res.clearCookie("remember_user");
        res.redirect("/");
    },   
    
    

}
       
module.exports = clientController;
