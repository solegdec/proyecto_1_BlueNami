module.exports = (req, res, next) => {
    if (typeof req.session.usuarioLogueado !="undefined"){
         if(req.session.usuarioLogueado.admin == 3){
             return next()
         }
     }
     return res.redirect("/")
 }