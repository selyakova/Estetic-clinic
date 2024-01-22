const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.NAME,
    process.env.USER,
    process.env.PASS,
    {
        host: process.env.HOST,
        dialect: "mariadb",
        define: {
            timestamps: false
        }
    }
);

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.services = require("./models/service.model")(sequelize,Sequelize)
db.clients = require("./models/client.model")(sequelize,Sequelize)
db.orders = require("./models/order.model")(sequelize,Sequelize,db.clients,db.services)

module.exports = db

async function Sync() {
    await sequelize.sync({alter:true})
}

module.exports = {db, Sync}