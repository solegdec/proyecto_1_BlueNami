const {validationResult}=require ("express-validator");
const fs = require("fs");
const path = require("path");
const bcryptjs = require('bcryptjs');

function findAll(){
    let usersJson = fs.readFileSync(path.join(__dirname, "../data/users.json"))
    let data = JSON.parse(usersJson)
    return data
  }
 function writeJson(array){
    let arrayJson= JSON.stringify(array);
    return fs.writeFileSync(path.join(__dirname, "../data/users.json"),arrayJson)
  }

const User = require('../models/User.js');

const clientController = {
	create: (req, res) => {
		return res.render('register');
	},
	store: (req, res) => {
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render('register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
		

		let userInDB = User.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('userRegisterForm', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

		let userToCreate = {
			...req.body,
			contraseña: bcryptjs.hashSync(req.body.contraseña, 10),
			avatar: req.file.filename
		}

		let userCreated = User.create(userToCreate);

		return res.redirect('/client/login');
	},
	login: (req, res) => {
		return res.render('login');
	},
	loginProcess: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email);
		
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.contraseña, userToLogin.contraseña);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('/client/profile');
			} 
			return res.render('login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('login', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
	},
	profile: (req, res) => {
		return res.render('profile', {
			user: req.session.userLogged
		});
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}
}


module.exports= clientController;
