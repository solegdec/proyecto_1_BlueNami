const {validationResult}=require ("express-validator");

const clientController={
    
    register:(req,res)=>{
        res.render("register")
        },
        store:(req,res)=>{
            const resultado= validationResult(req);
            if (resultado.errors.length>0){
                return res.render("register", {
                    errors: resultado.mapped(),
                    oldData:req.body
                });
                
            }
          
            res.redirect("/profile")
            
            
        },
    login:(req,res)=>{
            res.render("login")
            
        },
    update:(req,res)=>{
            res.redirect("/index")
            
        },
}
module.exports= clientController;
