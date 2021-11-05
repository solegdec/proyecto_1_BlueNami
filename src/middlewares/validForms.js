const path = require('path');
const {check}=require("express-validator")
const bcrypt = require('bcryptjs');
const db = require('../database/models');

const validations={
register:[
    check("nombre").notEmpty().withMessage("Tienes que completar tu Nombre").bail()
    .isLength({min:2}).withMessage("El nombre debe tener al menos 2 caracteres"),
    check("apellido").notEmpty().withMessage("Tienes que completar tu Apellido"),
    check("fechaNac").notEmpty().withMessage("Tienes que completar tu Fecha de Nacimiento"),
    check("email").isEmail().withMessage("Tienes que completar tu Email").bail()
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
   
    check("pais").notEmpty().withMessage("Tienes que completar tu Pais"),
    check("genero").notEmpty().withMessage("Tienes que completar tu Género"),
    check("password").notEmpty().withMessage("Tienes que completar tu Password").bail()
    .isLength({min:8}).withMessage("El Password debe tener al menos 8 caracteres"),
    check("avatar").custom((value,{req})=>{
        return req.file;
            })
            .withMessage("Debes subir una imagen de perfil").bail()
            .custom(function(value, {req} ){
                const imagenesValidas = [".jpg", ".jpeg", ".png", ".gif"]
                const ext = path.extname(req.file.originalname);
                return imagenesValidas.includes(ext);               
            })
            .withMessage("Debes subir un archivo válido")
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
            .withMessage("Tienes que completar el password")
            
],
userAdd:[
    check("nombre").notEmpty().withMessage("Tienes que completar tu Nombre").bail()
    .isLength({min:2}).withMessage("El nombre debe tener al menos 2 caracteres"),
    check("apellido").notEmpty().withMessage("Tienes que completar tu Apellido"),
    check("fechaNac").notEmpty().withMessage("Tienes que completar tu Fecha de Nacimiento"),
    check("email").isEmail().withMessage("Tienes que completar tu Email").bail()
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
   
    check("pais").notEmpty().withMessage("Tienes que completar tu Pais"),
    check("genero").notEmpty().withMessage("Tienes que completar tu Género"),
    check("password").notEmpty().withMessage("Tienes que completar tu Password").bail()
    .isLength({min:8}).withMessage("El Password debe tener al menos 8 caracteres"),
    check("avatar").custom((value,{req})=>{
        return req.file;
            })
            .withMessage("Debes subir una imagen de perfil").bail()
            .custom(function(value, {req} ){
                const imagenesValidas = [".jpg", ".jpeg", ".png", ".gif"]
                const ext = path.extname(req.file.originalname);
                return imagenesValidas.includes(ext);               
            })
            .withMessage("Debes subir un archivo válido")
],
productAdd:[
    check("nombre").notEmpty().withMessage("Tienes que completar el nombre del producto").bail()
    .isLength({min:5}).withMessage("El nombre del producto  debe tener al menos 5 caracteres"),
    check("marca").notEmpty().withMessage("Tienes que completar la marca del producto"),
    check("precio").notEmpty().withMessage("Tienes que completar el precio del producto"),
    check("descripcion").notEmpty().withMessage("Tienes que completar la descripción del producto").bail()
    .isLength({min:20}).withMessage("La descripción del producto  debe tener al menos 20 caracteres"),
    check("unidades").notEmpty().withMessage("Tienes que completar cantidad del producto"),
    check("foto").custom((value,{req})=>{
        return req.file;
            })
            .withMessage("Debes subir una imagen de producto").bail()
            .custom(function(value, {req} ){
                const imagenesValidas = [".jpg", ".jpeg", ".png", ".gif"]
                const ext = path.extname(req.file.originalname);
                return imagenesValidas.includes(ext);               
            })
            .withMessage("Debes subir un archivo válido")


],
productEdit:[
    check("nombre").notEmpty().withMessage("Tienes que completar el nombre del producto").bail()
    .isLength({min:5}).withMessage("El nombre del producto  debe tener al menos 5 caracteres"),
    check("marca").notEmpty().withMessage("Tienes que completar la marca del producto"),
    check("precio").notEmpty().withMessage("Tienes que completar el precio del producto"),
    check("descripcion").notEmpty().withMessage("Tienes que completar la descripción del producto").bail()
    .isLength({min:20}).withMessage("La descripción del producto  debe tener al menos 20 caracteres"),
    check("unidades").notEmpty().withMessage("Tienes que completar cantidad del producto"),
    check("foto").custom((value,{req})=>{
        return req.file;
            })
            .withMessage("Debes subir una imagen de producto").bail()
            .custom(function(value, {req} ){
                const imagenesValidas = [".jpg", ".jpeg", ".png", ".gif"]
                const ext = path.extname(req.file.originalname);
                return imagenesValidas.includes(ext);               
            })
            .withMessage("Debes subir un archivo válido")


]


}
module.exports=validations;
