const path = require('path');
const {check}=require("express-validator")

const validations=[
    check("nombre").notEmpty().withMessage("Tienes que completar este campo"),
    check("apellido").notEmpty().withMessage("Tienes que completar este campo"),
    check("nacimiento").notEmpty().withMessage("Tienes que completar este campo"),
    check("email")
    .notEmpty().withMessage("Tienes que completar este campo")
    .isEmail().withMessage("Tienes que completar con un email"),
    check("pais").notEmpty().withMessage("Tienes que completar este campo"),
    check("telefono").notEmpty().withMessage("Tienes que completar este campo"),
    check("password").notEmpty().withMessage("Tienes que completar este campo"),
    check("avatar").custom((value,{req})=>{
        let file=req.file;
        if (!file){
            throw new Error ("Tienes que subir una imagen");
        }
        return true;
    })]
    
module.exports= validations;