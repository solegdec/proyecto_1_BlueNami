const db = require('../database/models');
const { Op } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const {validationResult} = require ('express-validator')



const productCartController=

{
    listItems: (req, res) => {
        db.Items.findAll()
            .then(items => {
                res.render('productCart', {items})
            })
        
    },

}
module.exports= productCartController;
