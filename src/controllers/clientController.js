const clientController={
    
    register:(req,res)=>{
        res.render("register")
        },
    store:(req,res)=>{
            res.send(req.body)
            
        },
    login:(req,res)=>{
            res.render("login")
            
        },
    update:(req,res)=>{
            res.send("hola")
            
        },
}
module.exports= clientController;
