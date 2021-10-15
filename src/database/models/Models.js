//const { DataTypes } = require("sequelize/types")
//const { sequelize } = require(".")

module.exports = (sequelize, DataTypes)=> {

const Models = sequelize.define("Models", 
    {
        id:{
            auroincrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER

        },
        modelo:
        {
            allowNull: false,
            type: DataTypes.STRING
        },
       
       
    },
    {
        tableName: 'Models',
        timestamps: false,
    }

);

Models.associate = function(models){
    Models.hasMany(models.Products,{
        as: 'productos',
        foreignKey: "modelo_id"
    })
};

return Models

}


