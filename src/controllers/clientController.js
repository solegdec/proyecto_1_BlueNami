//Se escribe en mayuscula porque para diferenciar que es un "modelo"
const Users = require('../models/User.js');
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

    /*index: (req, res) => {
        const users_copy = Users.getAll()
        res.render('users', {'users': products_copy});
    },*/
    show: (req, res) =>{
        let userId = req.session.userId;
        let user = Users.findById(userId)
        res.render('profile',{
            user: user,
        })
    },
    create: (req, res) => {
        res.render('register');
    },
    store: (req, res)   => {
        let users_copy = Users.getAll().map(user => user);
        let UserId = uuidv4();
        if(req.body.password === req.body.confirm_password){
            if(secure_password.test(req.body.password)){
                const encrypt_pass = bcryptjs.hashSync(req.body.password, 10)
                const user = {
                    id: UserId,
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    genero: req.body.genero,
                    fechaNac: req.body.fechaNac,
                    email: req.body.email,
                    pais: req.body.pais,
                    //avatar:req.file.filename,
                    password: encrypt_pass,
                }
                users_copy.push(user)
                Users.modifiedAll(users_copy);
            console.log('Entro al store 1')
                res.redirect('/');
            }else{
                console.log('Entro al store 2')
                res.render('register', {errors:'Contraseña no segura'})
            }

        }else{
            console.log('Entro al store 3')
            res.render('register', {errors:'Contraseña no Coincide'})
        }

    },
    showLogin: (req, res)=>{
        res.render('login');
    },
    login: (req, res)=>{
        let user_email = req.body.email;
        const user = Users.findByEmail(user_email);
        //console.log(user)
        if(user){
            if(bcryptjs.compareSync(req.body.password, user.password)){
                req.session.userId = user.id;
                res.render('/');
            }else{
                res.render('login',{"errors": 'La combinacion de email y contraseña no es valido'});
            }
        }else{
            res.render('login',{"errors": 'El email no existe.'});
        }


    }


}

module.exports = clientController;
