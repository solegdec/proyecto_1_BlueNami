const path = require('path');
const {check}=require("express-validator")

const validations=[
    check("nombre").notEmpty().withMessage("Tienes que completar el campo Nombre"),
    check("apellido").notEmpty().withMessage("Tienes que completar el campo Apellido"),
    check("fechaNac").notEmpty().withMessage("Tienes que completar tu Fecha de Nacimient"),
    check("email")
    .notEmpty().withMessage("Tienes que completar tu email").bail()
    .isEmail().withMessage("Tienes que completar con un email valido"),
    check("pais").notEmpty().withMessage("Tienes que completar tu pais"),
    check("genero").notEmpty().withMessage("Tienes que completar tu genero"),
    check("password").notEmpty().withMessage("Tienes que completar la password"),
    check("avatar").custom((value,{req})=>{
        let file=req.file;
        if (!file){
            throw new Error ("Tienes que subir una imagen");
        }
        return true;
    })]
    
module.exports= validations;