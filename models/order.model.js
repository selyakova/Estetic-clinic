module.exports = (sequelize, Sequelize) => {
    const order = sequelize.define("orders", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        service_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        client_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    })
    return order
}