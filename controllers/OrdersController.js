const {db} = require('../db');
const order = db.orders

exports.getAll = async (req, res) => {
    const orders = await order.findAll({attributes:["service_id", "client_id"]})
    res.send(orders)
}

exports.getById = async (req,res) => {
    const orders = await order.findByPk(req.params.id)

    if (orders == null) {
        res.status(404).send({"error":"Order not found"})
        return
    }
    res.send(orders)
}

exports.createNew = async (req, res) => {
    console.log(req.body)
    let order
    try {
        order = await order.create(req.body)
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
    .location(`${getBaseUrl(req)}/Orders/${order.id}`)
    .json(order)
}

exports.updateById = async (req, res) => {
    let result
    delete (req.body.id)
    try {
        result = await order.update(req.body, {where: {id:req.params.id}})
    }
    catch (error) {
        console.log("OrdersUpdate: ", error)
        res.status(500).send({"error":"Server error, try again later"})
        return
    }
    if (result === 0 || result === undefined) {
        res.status(404).send({"error":"Order not found"})
        return
    }
    const order = await order.findByPk(res.params.id)
    res.status(200)
        .location(`${getBaseUrl(req)}/Orders/${order.id}`)
        .json(order)
}

exports.deleteById = async (req, res) => {
    let result
    try {
        result = await order.destroy({ where: {id:req.params.id}})
    } catch (error) {   
            console.log("OrdersCreateDelete", error)
            res.status(500).send({"error":"Server error, try again later"})
            return
        }

        if (result === 0 || result === undefined) {
            res.status(404).send({"error":"Order not found"})
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