const EsteticController = require('../controllers/EsteticController.js')
const OrdersController = require('../controllers/OrdersController.js')
const ClientsController = require('../controllers/ClientsController.js')

module.exports = (app) => {
    app.route("/estetic-clinic")
    .get(EsteticController.getAll)   
    .get(EsteticController.createNew)
    app.route("/estetic-clinic/:id")
    .get(EsteticController.getById)
    .put(EsteticController.updateById)
    .delete(EsteticController.deleteById)

    app.route("/clients")
    .get(ClientsController.getAll)   
    .get(ClientsController.createNew)
    app.route("/clients/:id")
    .get(ClientsController.getById)
    .put(ClientsController.updateById)
    .delete(ClientsController.deleteById)

    app.route("/orders")
    .get(OrdersController.getAll)   
    .get(OrdersController.createNew)
    app.route("/orders/:id")
    .get(OrdersController.getById)
    .put(OrdersController.updateById)
    .delete(OrdersController.deleteById)
}