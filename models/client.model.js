module.exports = (sequelize, Sequelize) => {
    const client = sequelize.define("clients", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        birthday: {
            type: Sequelize.STRING,
            allowNull: false
        },
        identityCode: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    })
    return client
}