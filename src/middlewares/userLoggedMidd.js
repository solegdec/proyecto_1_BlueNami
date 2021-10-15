/*const User = require ("../models/User");

function userLoggedMidd (req, res, next){
    res.locals.isLogged =false;
    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = User.findByPk("email", emailInCookie);

    if(userFromCookie){
        req.session.userLogged = userFromCookie }

    if (req.session && req.session.userLogged){
        res.locals.isLogged=true;
        res.locals.userLogged=req.session.userLogged;
    }

    next();


}
module.exports=userLoggedMidd;*/
const db = require("../database/models")
function userLoggedMidd(req, res, next){ 
    if(!req.session.userLogged && req.cookies.userEmail){
        db.Users.findOne({
            where:{
                id: req.cookies.remember_user
            }
        }).then(function(user){
            req.session.userLogged = user;
            return next()
        })
    }else{
        return next()
    }
        
}
module.exports= userLoggedMidd