//const { DataTypes } = require("sequelize/types")
//const { sequelize } = require(".")

module.exports = (sequelize, DataTypes)=> {

const Items = sequelize.define("Items", 
    {
        id:{
            auroincrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        cantidad:
        {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        subtotal:
        {
            allowNull: true,
            type: DataTypes.DECIMAL
        },
        producto_id:
        {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        usuario_id:
        {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        order_id:
        {
            allowNull: true,
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
        tableName: 'items',
        timestamps: false,
    }

);

Items.associate = function(models){
    Items.belongsTo(models.Products,{
        as: 'producto',
        foreignKey: 'producto_id',
    });
    Items.belongsTo(models.Users,{
        as: 'usuario',
        foreignKey: 'usuario_id',
    });
    Items.belongsTo(models.Orders,{
        as: 'orden',
        foreignKey: 'order_id',
    })
};

return Items

}

