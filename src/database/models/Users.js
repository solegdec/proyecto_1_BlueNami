//const { DataTypes } = require("sequelize/types")
//const { sequelize } = require(".")

module.exports = (sequelize, DataTypes)=> {

const Users = sequelize.define("Users", 
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
        apellido:
        {
            allowNull: false,
            type: DataTypes.STRING
        },
        genero:
        {
            allowNull: false,
            type: DataTypes.STRING
        },
        email:        
        {  allowNull: false,
            unique: true,
            type: DataTypes.STRING
        },
        pais:
        {
            allowNull: false,
            type: DataTypes.STRING
        },
        fechaNac:
        {
            allowNull: false,
            type: DataTypes.DATE
        },
        avatar:
        {
            allowNull: false,
            type: DataTypes.STRING
        },
        password:
        {
            allowNull: false,
            type: DataTypes.STRING
        },
        categoria_id:    {
            foreignKey:true,
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
        tableName: 'users',
        timestamps: false,
        //defaultScope: {
          //    attributes: { exclude: ['password' , 'categoria_id'] }
            //}
    }

);

Users.associate = function(models){
    Users.belongsTo(models.Categories,{
        as: 'categoria',
        foreignKey: "categoria_id"
    }),
    Users.hasMany(models.Items,{
        as: 'items2',
        foreignKey: "usuario_id"
        })

    };

return Users

}




