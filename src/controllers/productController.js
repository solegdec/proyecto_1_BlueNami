const db = require('../database/models');
const { Op } = require("sequelize");
const {validationResult} = require("express-validator")

  
  let productController={
    list: (req, res) => {
        db.Products.findAll(
            {            include: ['modelo']        }
        )
            .then(products => {
                res.render('product', {products})
            })
    },
    
    detail: (req,res)=>{
        db.Products.findByPk(req.params.id, {
            include: [{association: "modelo"},{association:"colours"}]
        })
        .then(function(product){
            res.render("productDetail",{product})
        })   
    
    
    },
    buscar: function (req, res, next) {
        let productToFind = req.keyword.products;
        db.Products.findAll({
            where: {
                name: { [Op.like]: '%' + productToFind + '%' }
            }
        })
    },

    create: (req,res)=>{
        db.Models.findAll() 
        .then(function(modelos){
            return res.render("product-add-form", {modelos})
        })
    },

    store: function(req, res){
        db.Products.create(
        {
          nombre: req.body.nombre ,
          descripcion: req.body.descripcion,
          unidades: req.body.unidades,
          foto: req.body.foto,
          precio: req.body.precio,
          
        })

        res.redirect("/product");
    },
    /*edit: (req,res)=>{
        let pedidoUsuario = db.Users.findByPk(req.params.id);
        let pedidoCategoria = db.Categories.findAll();
        
        Promise.all([pedidoUsuario, pedidoCategoria])
            .then(function([user, categorias]){
                res.render("user-edit-form",{user, categorias})
            })
        
        
    },*/
    //aca faltan los datos correctos de product
    update: (req,res)=>{
        db.Products.update(
            {
              nombre: req.body.nombre ,
              descripcion: req.body.descripcion,
              unidades: req.body.unidades,
              foto: req.body.foto,
              precio: req.body.precio,e,
            }, {
                where: {
                    id: req.params.id
                }
            });
            
            res.redirect("/product");
        },

    destroy: (req,res)=>{
        db.Products.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect("/product")
    },
}
module.exports= productController;
