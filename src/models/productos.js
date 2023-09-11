const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../libs/index");

class Productos extends Model { }
Productos.init({
    id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: DataTypes.STRING,
    precio: DataTypes.DOUBLE,
    descripcion: DataTypes.STRING,
    categoria: DataTypes.STRING,
    imagen: DataTypes.STRING
}, { sequelize, modelName: "Productos" })

Productos.sync({ alter: true })

module.exports = Productos 
