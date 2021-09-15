function authMiddleware (req, res, next){
    if (!req.session.userLogged){
        return res.redirect('/client/login')
    }
    next();
}

module.exports = authMiddleware;