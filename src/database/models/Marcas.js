//const { DataTypes } = require("sequelize/types")
//const { sequelize } = require(".")

module.exports = (sequelize, DataTypes)=> {

const Marcas = sequelize.define("Marcas", 
    {
        id:{
            auroincrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER

        },
        marca:
        {
            allowNull: false,
            type: DataTypes.STRING
        },
       
       
    },
    {
        tableName: 'brands',
        timestamps: false,
    }

);

Marcas.associate = function(models){
    Marcas.hasMany(models.Products,{
        as: 'productos',
        foreignKey: "marca_id"
    })
};

return Marcas

}


