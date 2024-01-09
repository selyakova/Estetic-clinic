const {db} = require('../db');
const Service = db.services

exports.getAll = async (req, res) => {
    const Services = await Service.findAll({attributes:["name"]})
    res.send(Services)
}