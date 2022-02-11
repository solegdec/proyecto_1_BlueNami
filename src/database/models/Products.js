//const { DataTypes } = require("sequelize/types")
//const { sequelize } = require(".")
const sequelizeSoftDelete = require('sequelize-soft-delete')

module.exports = (sequelize, DataTypes)=> {

const Products = sequelize.define("Products", 
    {
        id:{
            auroincrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER

        },
        nombre:
        {
            allowNull: false,
            type: DataTypes.STRING
        },
        descripcion:
        {
            allowNull: false,
            type: DataTypes.TEXT
        },
        foto:
        {
            allowNull: false,
            type: DataTypes.STRING
        },
        unidades:        
        {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        precio:
        {
            allowNull: false,
            type: DataTypes.DECIMAL
        },
        marca_id:    {
            foreignKey:true,
            allowNull: false,
            type: DataTypes.INTEGER
        },
        
            borrado: {
              type: DataTypes.INTEGER(1),
              defaultValue: 0
            },
          
    },
    {
        tableName: 'products',
        timestamps: false,

        defaultScope: {
            where: {
              borrado: 0
            }
          } 
    }
    
);

const options = {field: 'borrado', borrado: 1}
    sequelizeSoftDelete.softDelete(Products, options)

Products.associate = function(models){
    Products.belongsToMany(models.Colours,{
        as: 'colours',
        through: 'products_colours',
        foreignKey: 'producto_id',
        otherKey: "color_id",
        timestamps: false,
    }),
    Products.belongsTo(models.Marcas,{
        as: 'marca',
        foreignKey: "marca_id"
        }),
    Products.hasMany(models.Items,{
        as: 'items',
        foreignKey: "producto_id"
        })
    
};

return Products

}

