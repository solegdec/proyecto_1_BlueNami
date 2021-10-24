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
                usuario_id:req.session.userLogged.id,
                order_id: null,
                }
          
        })
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
        addOrder: async(req, res) =>{
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

            let orderNew = await db.Orders.create({
                importe_total: totalPrice,
                usuario_id: req.session.userLogged.id,
                fecha: new Date(),
            })
            
            await db.Items.update(
            {
                order_id: orderNew.id
            }
            ,{where:{
                    usuario_id: req.session.userLogged.id,
                    order_id: null
                }
            })
            console.log(Items)
            return res.redirect("/")
        }


}

module.exports= productCartController;
