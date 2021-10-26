const db = require('../database/models');
const { Op } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const {validationResult} = require ('express-validator');
const Items = require('../database/models/Items');



const productCartController={
    listCart: async (req, res) =>{
        let items = await db.Items.findAll(
            {include:["producto", "orden", "usuario"],
            where: {
                order_id: null,
                usuario_id: req.session.userLogged.id
                }
            },
        );
        let totalPrice = 0;
        items.forEach(item =>{
            totalPrice = Number(totalPrice) + Number(item.subtotal)
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
        destroyItem: async (req, res) =>{
            await db.Items.destroy({
                where:{
                    id: req.params.id
                }
            });
            res.redirect("/productCart")
        },
        addOrder: async (req, res) =>{
            let items = await db.Items.findAll({
                include:["producto", "orden", "usuario"],
                where:{
                    usuario_id: req.session.userLogged.id,
                    order_id: null
                }
            })
            let totalPrice = 0;
            items.forEach(item => {
                totalPrice = Number(totalPrice) + Number(item.subtotal)
            })
            let ordersFound = await db.Orders.findAll()
            let newId = ordersFound.length === 0 ? 1 :  ordersFound[ordersFound.length-1].id + 1
            let newOrder = await db.Orders.create({   
                importe_total: totalPrice,
                usuario_id: req.session.userLogged.id,
                fecha: new Date(),
                id: newId
            })
            
            await db.Items.update(
                {order_id: newOrder.id},
                {where:{
                    usuario_id: req.session.userLogged.id,  
                    order_id: null,
                    }
                }
            )
            return res.redirect("/productCart")
        }


}

module.exports= productCartController;
