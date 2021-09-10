//Se escribe en mayuscula porque para diferenciar que es un "modelo"
const User = require('../models/User.js');
const { v4: uuidv4 } = require('uuid');
const bcryptjs = require('bcryptjs');
const {validationResult} = require ('express-validator')

/*
    Minimo 8 caracteres
    Maximo 15
    Al menos una letra mayúscula
    Al menos una letra minucula
    Al menos un dígito
    No espacios en blanco
    Al menos 1 caracter especial
*/

const secure_password =new RegExp( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/);


const clientController = {
    register: (req, res) => {
        res.render('register');
    },
    processRegister: (req, res) =>{
        const resultValidation = validationResult(req);
                if (resultValidation.errors.length > 0) {
                return res.render('register', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            }
            let userInDb= User.findByField("email", req.body.email);
            if (userInDb){
                return res.render("register",{
                 errors:{email:{msg:"Este email ya está registrado"}},
                 oldData:req.body 
                });
            }
            let userToCreate={
                ...req.body,
                password:bcryptjs.hashSync(req.body.password, 10),
                avatar:req.file.filename
            }
           let userCreated = User.create(userToCreate)
        res.redirect("/client/login")
    },
    login: (req, res)=>{
        res.render('login');
    },
    loginProcess: (req, res)=>{
        let userToLogin = User.findByField("email",req.body.email);
        if(userToLogin){
                let passOK=bcryptjs.compareSync(req.body.password, userToLogin.password);
                if(passOK){
                delete userToLogin.password;
                req.session.userLogged=userToLogin
                return res.redirect("/client/profile/")  
                }
                return res.render("login",{errors:{email:{msg:"Las credenciales son inválidas"}}});
                }
     
    },
    show: (req, res)=>{
        res.render('profile',{
         user:req.session.userLogged   
        });
    },

}
       
module.exports = clientController;
