function guestMiddleware (req, res, next){
    if (req.session.userLogged){
        return res.redirect('/client/profile')
    }
    next();
}

module.exports = guestMiddleware;