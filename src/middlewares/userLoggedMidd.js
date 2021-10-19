const db = require("../database/models")

function userLoggedMidd(req, res, next){ 
    if(!req.session.userLogged && req.cookies.email){
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