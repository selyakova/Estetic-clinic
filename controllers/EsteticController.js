const {db} = require('../db');
const Service = db.services

exports.getAll = async (req, res) => {
    const Services = await Service.findAll({attributes:["name"]})
    res.send(Services)
}

exports.getById = async (req,res) => {
    const Services = await Service.findByPk(req.params.id)
    res.send(Services)
    if (Services == null) {
        res.status(404).send({"error":"Service not found"})
        return
    }
    res.send(Services)
}

exports.createNew = async (req, res) => {
    console.log(req.body)
    //const Service = await Service.create(req.body)
    let Service
    try {
        Service = await Service.create(req.body)
    } catch (error) {
        if(error instanceof db.Sequelize.ValidationError) {
            console.log(error)
            res.status(400).send({"error":"Invalid Input"})
        } else {
            console.log("ServicesCretae", error)
            res.status(500).send({"error":"Server error, try again later"})
        }
        return
    }
    res
    .status(201)
    .location(`${getBaseUrl(req)}/Services/${Service.id}`)
    .json(Service)
}

getBaseUrl = (request) => {
    return (
        (request.connection && request.connection.encrypted ? "https" : "http" ) +
        `://${request.headers.host}`
    )
}