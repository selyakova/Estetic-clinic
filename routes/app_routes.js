const EsteticController = require('../controllers/EsteticController.js')

module.exports = (app) => {
    app.route("/estetic-clinic")
    .get(EsteticController.getAll)
}