module.exports = (sequelize, Sequelize, service, client) => {
    const order = sequelize.define("orders", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        service_id: {
            type: Sequelize.INTEGER,           
            allowNull: false,
            references: {
                model: service,
                key: "id",
            }
        },
        client_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: client,
                key: "id",
            }
        },
    })

    service.belongsToMany(client, {through: order})
    client.belongsToMany(service, {through: order})

    service.hasMany(order)
    order.belongsTo(service)

    client.hasMany(order)
    order.belongsTo(client)

    return order
}