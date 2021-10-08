const { DataTypes } = require("sequelize/types")
const { sequelize } = require(".")

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
       
        created_at:    {
            allowNull: true,
            type: DataTypes.DATE
        },
        updated_at:
        {
            allowNull: true,
            type: DataTypes.DATE
        },
    },
    {
        tableName: 'Models',
        timestamps: true,
    }

)
};


Models.associate = function(){
    Models.hasMany(Products,{
        as: 'productos',
        foreignKey: "modelo_id"
    })
}



return Models