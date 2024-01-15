const EsteticController = require('../controllers/EsteticController.js')

module.exports = (app) => {
    app.route("/estetic-clinic")
    .get(EsteticController.getAll)   
    .get(EsteticController.createNew)
    app.route("/estetic-clinic/:id")
    .get(EsteticController.getById)
    .put(EsteticController.updateById)
    .delete(EsteticController.deleteById)
}