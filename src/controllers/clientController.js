const {validationResult}=require ("express-validator");
function findAll(){
    
    let usersJson = fs.readFileSync(path.join(__dirname, "../data/users.json"))
    let data = JSON.parse(usersJson)
    return data
  }
 
  function writeJson(array){
    let arrayJson= JSON.stringify(array);
    return fs.writeFileSync(path.join(__dirname, "../data/users.json"),arrayJson)
  }

const clientController={
    
        registerForm:(req,res)=>{
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
        //profile: (req, res) => {
             //res.render('profile');
        //},
}
module.exports= clientController;
