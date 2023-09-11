const { Sequelize } = require("sequelize")
const DBconfig = require("../config/database")

const sequelize = new Sequelize(DBconfig.database, DBconfig.username, DBconfig.password, {
    host: DBconfig.host,
    dialect: DBconfig.dialect,
    logging: false
})

module.exports = { sequelize }
