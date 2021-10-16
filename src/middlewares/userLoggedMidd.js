/*function userLoggedMidd(req, res, next){ 
    if(!req.session.userLogged && req.cookies.userEmail){
        db.Users.findOne({
            where:{
                id: req.cookies.userEmail
            }
        }).then(function(user){
            req.session.userLogged = user;
            return next()
        })
    }else{
        return next()
    }
        
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