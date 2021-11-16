const db = require('../../database/models');
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

let apiController={
listProducts:(req,res)=>{
        db.Products
        .findAll()
        .then(products=>{
            return res.status(200).json({
                total: products.length,
                data: products,
                status:200
            })
        })
    },

detailProduct:(req,res)=>{
    db.Products
        .findByPk(req.params.id)
        .then(product=>{
            return res.status(200).json({
                data: product,
                status:200
            })
        })
    
    },
listMarcas: async function(req, res){
        let marcas = await db.Marcas.findAll({
            include:["productos"]
        })
        let marcasJson = {
            meta:{
                status:200,
                url: "/api/marcas",
            },
            data: marcas
        }
        res.json(marcasJson);
    },
createProduct:(req,res)=>{
    db.Products
        .create(req.body)
        .then(product=>{
            return res.status(200).json({
                data: product,
                status:200,
                created:"ok"
            })
        })
    
    },
updateProduct:(req,res)=>{
    
        db.Products
        .findByPk(req.params.id)
        .then(product=>{
            return res.status(200).json({
                data: product,
                status:200,
                updated:"ok"
            })
        })
 
},
deleteProduct:(req,res)=>{
    db.Products
    .destroy({
        where: {
            id: req.params.id
        }
    })
    .then (response=>{
        return res.json (response)
    })
    
    },
searchProducts:(req,res)=>{
    db.Products
    .findAll({
        where:{
            nombre: { [Op.like]: '%' + req.query.search + '%' }
        }
    })
    .then (products=>{
        return res.status(200).json(products);

    })

},
listUsers:(req,res)=>{
    db.Users
    .findAll()
    .then(users=>{
        return res.status(200).json({
            total: users.length,
            data: users,
            status:200
        })
    })
},
detailUser:(req,res)=>{
db.Users
    .findByPk(req.params.id)
    .then(user=>{
        return res.status(200).json({
            data: user,
            status:200
        })
    })

},
listCategories: async function(req, res){
    let categorias = await db.Categories.findAll({
        include:["usuarios"]
    })
    let categoriasJson = {
        meta:{
            status:200,
            url: "/api/categorias",
        },
        data: categorias
    }
    res.json(categoriasJson);
},
createUser:(req,res)=>{
db.Users
    .create(req.body)
    .then(user=>{
        return res.status(200).json({
            data: user,
            status:200,
            created:"ok"
        })
    })

},
updateUser:(req,res)=>{

    db.Users
    .findByPk(req.params.id)
    .then(user=>{
        return res.status(200).json({
            data: user,
            status:200,
            updated:"ok"
        })
    })
   


},
deleteUser:(req,res)=>{
db.Users
.destroy({
    where: {
        id: req.params.id
    }
})
.then (response=>{
    return res.json (response)
})

},
searchUsers:(req,res)=>{
db.Users
.findAll({
    where:{
        nombre: { [Op.like]: '%' + req.query.search + '%' }
    }
})
.then (users=>{
    return res.status(200).json(users);

})

}


}
module.exports  = apiController;