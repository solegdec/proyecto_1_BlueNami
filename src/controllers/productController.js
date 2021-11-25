const db = require('../database/models');
const { Op } = require("sequelize");


  
  let productController={
    list: (req, res) => {
        db.Products.findAll(
            { include: ['marca']}
        )
            .then(products => {
                res.render('product', {products})
            })
        
    },
    
    detail: async (req,res)=>{
        await db.Products.findByPk(req.params.id, {
            include: [{association: "marca"},{association:"colours"}]
        })
        
        .then(function(product){
            res.render("productDetail",{product})
        })
    
    
    },
    buscar: (req,res)=> {
       
        db.Products.findAll({

            where: {
                nombre: { [Op.like]: '%' + req.query.search + '%' }
                
            }
        })
     
        .then(products=>{
            res.render("product",{products})
        })
        .catch(err=>{res.send(err)})
    },

    
}
module.exports= productController;
