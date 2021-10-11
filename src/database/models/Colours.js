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
        tableName: 'Colours',
        timestamps: true,
    }

);


Colours.associate = function(models){
    Colours.belongsToMany(models.Products,{
        as: 'productos2',
        through: 'products_colours',
        foreignKey: 'producto_id',
        otherKey: "color_id",
        timestamps: true,
    })
};

return Colours
}


