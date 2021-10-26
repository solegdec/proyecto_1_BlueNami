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
            allowNull: true,
            type: DataTypes.STRING
        },
        unidades:        
        {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        precio:
        {
            allowNull: true,
            type: DataTypes.DECIMAL
        },
        marca_id:    {
            foreignKey:true,
            allowNull: true,
            type: DataTypes.INTEGER
        },

        
    },
    {
        tableName: 'products',
        timestamps: false,
    }

);

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

