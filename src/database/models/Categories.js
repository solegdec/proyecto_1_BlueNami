const { DataTypes } = require("sequelize/types")
const { sequelize } = require(".")

module.exports = (sequelize, DataTypes)=> {

const Categories = sequelize.define("Categories", 
    {
        id:{
            auroincrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER

        },
        categoria:
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
        tableName: 'userCategories',
        timestamps: true,
    }

)
};


Categories.associate = function(){
    Categories.hasMany(Users,{
        as: 'usuarios',
        foreignKey: "categoria_id"
    })
}



return Categories