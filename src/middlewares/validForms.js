const path = require('path');
const {check}=require("express-validator")
const bcrypt = require('bcryptjs');
const Users = require('../database/models/Users.js')
const db = require('../database/models');

const validations={
register:[
    check("nombre").notEmpty().withMessage("Tienes que completar el campo Nombre").isLength({min:2}),
    check("apellido").notEmpty().withMessage("Tienes que completar el campo Apellido"),
    check("fechaNac").notEmpty().withMessage("Tienes que completar tu Fecha de Nacimiento"),
    check("email").isEmail().withMessage("Tienes que completar tu email").bail()
            .custom(function(value){
                return db.Users.findOne({
                    where:{
                        email: value
                    }
                }).then(user => {
                    if(user){
                        return Promise.reject("Email ya registrado!")
                    }
                })
            }),
   
    check("pais").notEmpty().withMessage("Tienes que completar tu pais"),
    check("genero").notEmpty().withMessage("Tienes que completar tu genero"),
    check("password").notEmpty().withMessage("Tienes que completar tu password").isLength({min:8}),
    check("avatar").custom((value,{req})=>{
        return req.file;
            })
            .withMessage("Debes subir una imagen de perfil").bail()
            .custom(function(value, {req} ){
                const imagenesValidas = [".jpg", ".jpeg", ".png", ".gif"]
                const ext = path.extname(req.file.originalname);
                return imagenesValidas.includes(ext);               
            })
            .withMessage("archivo no valido")
],
    


login:[
    check("email")
            .notEmpty().withMessage("Tienes que completar tu email").bail()
            .isEmail().withMessage("Tienes que completar con un email valido").bail()
            .custom(function(value, {req}){
             return db.Users.findOne({
                where:{
                    email: value
                }
             }).then(user => {
                    if(!user){
                        return Promise.reject("Usuario o contraseña invalidos")
                    }
                    if(!bcrypt.compareSync(req.body.password, user.password)){
                        return Promise.reject("Credenciales invalidas")
                    }
                })
            }),
        check("password")
            .notEmpty()
            .withMessage("Tienes que completar la password")
],
userAdd:[
    check("nombre").notEmpty().withMessage("Tienes que completar el campo Nombre").isLength({min:2}),
    check("apellido").notEmpty().withMessage("Tienes que completar el campo Apellido"),
    check("fechaNac").notEmpty().withMessage("Tienes que completar tu Fecha de Nacimiento"),
    check("email").isEmail().withMessage("Tienes que completar tu email").bail()
            .custom(function(value){
                return db.Users.findOne({
                    where:{
                        email: value
                    }
                }).then(user => {
                    if(user){
                        return Promise.reject("Email ya registrado!")
                    }
                })
            }),
   
    check("pais").notEmpty().withMessage("Tienes que completar tu pais"),
    check("genero").notEmpty().withMessage("Tienes que completar tu genero"),
    check("password").notEmpty().withMessage("Tienes que completar tu password").isLength({min:4}),
    check("avatar").custom((value,{req})=>{
        return req.file;
            })
            .withMessage("Debes subir una imagen de perfil").bail()
            .custom(function(value, {req} ){
                const imagenesValidas = [".jpg", ".jpeg", ".png", ".gif"]
                const ext = path.extname(req.file.originalname);
                return imagenesValidas.includes(ext);               
            })
            .withMessage("archivo no valido")
],



}
module.exports=validations;
