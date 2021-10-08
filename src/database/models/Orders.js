const { DataTypes } = require("sequelize/types")
const { sequelize } = require(".")

module.exports = (sequelize, DataTypes)=> {

const Orders = sequelize.define("Orders", 
    {
        id:{
            auroincrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        fecha:
        {
            allowNull: false,
            type: DataTypes.DATE
        },
        importe_total:
        {
            allowNull: false,
            type: DataTypes.DECIMAL
        },
    
        usuario_id:
        {
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
        tableName: 'orders',
        timestamps: true,
    }

)
};

Orders.associate = function(){
    Orders.belongsTo(Users,{
        as: 'usuario2',
        foreignKey: 'usuario_id',
    });
    Orders.hasMany(Items,{
        as: 'items',
        foreignKey: 'order_id',
    })
}

return Orders