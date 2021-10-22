const db = require('../database/models');
const { Op } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const {validationResult} = require ('express-validator')



const productCartController={
    listCart: async (req, res) =>{
        let items = await db.Items.findAll({include:[{association:"producto"}]},
            {
            where: {
                usuario_id: req.session.userLogged.id,
                order_id: null
                
            }
           
        })
       
        let totalPrice = 0;
        items.forEach(item =>{
            totalPrice += item.subtotal
        })
        return res.render("productCart", { items , totalPrice});
    },
    addItem: async (req, res) => {
        let productFound = await db.Products.findByPk(req.params.id, {
            include:[{association:"marca"},{association:"colours"}]
        });
        await db.Items.create({
           cantidad:Number(req.body.cantidad),
           subtotal:Number(req.body.cantidad) * Number(productFound.precio),
           producto_id:productFound.id,
           
           usuario_id: req.session.userLogged.id
            
            
        
           
        })
        return res.redirect("/productCart") 

    },


  

}

module.exports= productCartController;
