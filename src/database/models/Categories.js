//const { DataTypes } = require("sequelize/types")
//const { sequelize } = require(".")

module.exports = function (sequelize, DataTypes) {

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
        timestamps: false
    }

);


Categories.associate = function(models){
    Categories.hasMany(models.Users,{
        as: 'usuarios',
        foreignKey: "categoria_id"
    })

   
};

return Categories;

}




