const {db} = require('../db');
const client = db.clients

exports.getAll = async (req, res) => {
    const clients = await client.findAll({attributes:["name", "birthday", "identityCode"]})
    res.send(clients)
}

exports.getById = async (req,res) => {
    const clients = await client.findByPk(req.params.id)
    if (clients == null) {
        res.status(404).send({"error":"Client not found"})
        return
    }
    res.send(clients)
}

exports.createNew = async (req, res) => {
    console.log(req.body)
    //const Service = await Service.create(req.body)
    let client
    try {
        client = await client.create(req.body)
    } catch (error) {
        if(error instanceof db.Sequelize.ValidationError) {
            console.log(error)
            res.status(400).send({"error":"Invalid Input"})
        } else {
            console.log("clientsCreate", error)
            res.status(500).send({"error":"Server error, try again later"})
        }
        return
    }
    res
    .status(201)
    .location(`${getBaseUrl(req)}/Clients/${client.id}`)
    .json(client)
}

exports.updateById = async (req, res) => {
    let result
    delete (req.body.id)
    try {
        result = await client.update(req.body, {where: {id:req.params.id}})
    }
    catch (error) {
        console.log("ClientsUpdate: ", error)
        res.status(500).send({"error":"Server error, try again later"})
        return
    }
    if (result === 0 || result === undefined) {
        res.status(404).send({"error":"Client not found"})
        return
    }
    const client = await client.findByPk(res.params.id)
    res.status(200)
        .location(`${getBaseUrl(req)}/Clients/${client.id}`)
        .json(client)
}

exports.deleteById = async (req, res) => {
    let result
    try {
        result = await client.destroy({ where: {id:req.params.id}})
    } catch (error) {   
            console.log("ClientsCreateDelete", error)
            res.status(500).send({"error":"Server error, try again later"})
            return
        }

        if (result === 0 || result === undefined) {
            res.status(404).send({"error":"Client not found"})
            return
        }
        res.status(204).send()
    }


getBaseUrl = (request) => {
    return (
        (request.connection && request.connection.encrypted ? "https" : "http" ) +
        `://${request.headers.host}`
    )
}