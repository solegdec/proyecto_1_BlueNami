function logueado(req, res, next){
res.locals.usuario= false
if(req.session.userLogged){
    res.locals.usuario=req.session.userLogged
}
 return next();
}
module.exports=logueado
