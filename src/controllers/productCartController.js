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
                user_id: req.session.userLogged.id,
                order_id: null
            }
        })
        let totalPrice = 0;
        items.forEach(item =>{
            totalPrice += item.subtotal
        })
        return res.render("productCart", { items , totalPrice});
    },


    

}
module.exports= productCartController;
