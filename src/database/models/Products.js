//const { DataTypes } = require("sequelize/types")
//const { sequelize } = require(".")

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
            allowNull: true,
            type: DataTypes.TEXT
        },
        foto:
        {
            allowNull: false,
            type: DataTypes.STRING
        },
        unidades:        
        {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        precio:
        {
            allowNull: false,
            type: DataTypes.DECIMAL
        },
        modelo_id:    {
            foreignKey:true,
            allowNull: false,
            type: DataTypes.INTEGER
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
        tableName: 'products',
        timestamps: true,
    }

);

Products.associate = function(models){
    Products.belongsToMany(models.Colours,{
        as: 'colours',
        through: 'products_colours',
        foreignKey: "color_id",
        otherKey: 'producto_id',
        timestamps: true,
    }),
    Products.belongsTo(models.Models,{
        as: 'modelo',
        foreignKey: "modelo_id"
        }),
    Products.hasMany(models.Items,{
        as: 'items',
        foreignKey: "producto_id"
        })
    
};

return Products

}

