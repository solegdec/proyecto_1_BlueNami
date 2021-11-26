const db = require('../../database/models');
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

let apiController={
listProducts: async (req,res)=>{
    let products=await db.Products.findAll({
        include:["marca","colours"],
        
})
    let coloursList= await db.Colours.findAll({
        include:["productos"]
    })

    let qtyProducts = coloursList.map(colour =>{
        return {
            id: colour.id,
            name: colour.color,
            count: colour.productos.length
        }
    })
    let lastProducts = await db.Products.findAll({
        include:["marca"],
        order: [
            ['created_at', 'DESC'],
        ],
        limit: 5
    })

    let productsJson = {
        meta:{
            status: 200,
            count: products.length,
            
            countByColours: qtyProducts,
            url: "/api/products",
            lastProducts: lastProducts,
            
           
        },
        data:products
    }
    res.json(productsJson)

        
        
    },
    

listColours: async function(req, res){
        let coloursList = await db.Colours.findAll({
            include: ["productos"]
        })
        let qtyProducts = coloursList.map(colour =>{
            return {
                id: colour.id,
                name: colour.color,
                count: colour.productos.length
            }
        })

        let coloursJson = {
            meta:{
                status:200,
                url:"/api/colours",
                qtyProducts
            },
            data: coloursList
        }
        res.json(coloursJson)
    }, 

detailProduct: function(req, res){
        db.Products.findByPk(req.params.id, {
            include:["marca","colours"],
            
    }).then(product =>{
            let productJson = {
                data:{
                    id: product.id,
                    nombre: product.nombre,
                    precio: product.precio,
                    descripcion: product.descripcion,
                    color: product.colour_id,
                    marca: product.marca,
                    foto: "/img/" + product.foto,
                    url: "/api/products/" + req.params.id
                }
            }
            res.json(productJson)
        })
    },
listMarcas: async function(req, res){
        let marcas = await db.Marcas.findAll({
            include:["productos"]
        })
        let marcasJson = {
            meta:{
                count: marcas.length,
                status:200,
                url: "/api/marcas",
                data:marcas
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
            count: users.length,
            users: users,
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
            status:200,
            avatar: "/img/avatars/" + user.avatar,
            url: "/api/users/" + req.params.id
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