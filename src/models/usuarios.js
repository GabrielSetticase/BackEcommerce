const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../libs/index");

class Usuarios extends Model { }
Usuarios.init({
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: DataTypes.STRING,
    password: DataTypes.STRING,
    direccion: DataTypes.STRING,
    email: DataTypes.STRING,
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { sequelize, modelName: "Usuarios", tableName: "usuarios" })
Usuarios.sync({ alter: true })
module.exports = Usuarios 
