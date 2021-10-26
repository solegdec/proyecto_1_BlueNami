//const { DataTypes } = require("sequelize/types")
//const { sequelize } = require(".")

module.exports = (sequelize, DataTypes)=> {

const Colours = sequelize.define("Colours", 
    {
        id:{
            auroincrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER

        },
        color:
        {
            allowNull: true,
            type: DataTypes.STRING
        },
       
        
    },
    {
        tableName: 'Colours',
        timestamps: false,
    }

);


Colours.associate = function(models){
    Colours.belongsToMany(models.Products,{
        as: 'productos',
        through: 'products_colours',
        foreignKey: 'color_id',
        otherKey: "producto_id",
        timestamps: false,
    })
};

return Colours
}


