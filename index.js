require("dotenv").config();
const express = require('express')
const app = express();
const port = process.env.APP_PORT;
const mariadb = require("mariadb");
const cors = require('cors');


const swaggerUi = require('swagger-ui-express')
const yamljs = require('yamljs');
const { orders } = require("./db");
const swaggerDocument = yamljs.load('./docs/swagger.yaml');

app.use(cors())


require("./routes/app_routes")(app)

app.get('/EsteticClinic/:id', (req,res) => {
    if (typeof estetic[req.params.id -1] === 'undifined')
    {
        return res.status(404).send({error: "Service not found"})
    }
    res.send(estetic[req.params.id - 1])
})

app.get('/clients/:id', (req,res) => {
    if (typeof clients[req.params.id -1] === 'undifined')
    {
        return res.status(404).send({error: "Service not found"})
    }
    res.send(clients[req.params.id - 1])
})

app.get('/orders/:id', (req,res) => {
    if (typeof orders[req.params.id -1] === 'undifined')
    {
        return res.status(404).send({error: "Service not found"})
    }
    res.send(orders[req.params.id - 1])
})

app.post('/EsteticClinic', (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    let estserv = { 
        id: estetic.length +1,
        price: req.body.price,
        name: req.body.name
    }
    
    estetic.push(estserv)

    res.status(201)
    .location(`${getBaseUrl(req)}/EsteticClinic/${estetic.length}`)
    .send(estserv)
})

app.post('/clients', (req, res) => {
    if (!req.body.name || !req.body.birthday || !req.body.identityCode) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    let client = { 
        id: clients.length +1,
        name: req.body.name,
        birthday: req.body.birthday,
        identityCode: req.body.identityCode
    }
    clients.push(client)
    res.status(201)
    .location(`${getBaseUrl(req)}/clients/${clients.length}`)
    .send(client)
})

app.post('/orders', (req, res) => {
    if (!req.body.service_id || !req.body.order_id) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    let order = { 
        id: orders.length +1,
        service_id: req.body.service_id,
        order_id: req.body.order_id
    }
    orders.push(order)
    res.status(201)
    .location(`${getBaseUrl(req)}/orders/${orders.length}`)
    .send(order)
})


app.use(express.json())

app.delete('/EsteticClinic/:id', (req, res) => {
    if (typeof estetic[req.params-id - 1] === 'undefined') {
        return res.status(404).send({error: "Service not found"})
    }
    estetic.splice(req.params.id -1, 1)

    res.status(204).send({error: "No content"})
})

app.delete('/clients/:id', (req, res) => {
    if (typeof clients[req.params-id - 1] === 'undefined') {
        return res.status(404).send({error: "Service not found"})
    }
    clients.splice(req.params.id -1, 1)

    res.status(204).send({error: "No content"})
})

app.delete('/orders/:id', (req, res) => {
    if (typeof orders[req.params-id - 1] === 'undefined') {
        return res.status(404).send({error: "Service not found"})
    }
    orders.splice(req.params.id -1, 1)

    res.status(204).send({error: "No content"})
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, async() => {
    console.log(`API up at: http://localhost:${port}`)
})

function getBaseUrl(req) {
    return req.connection && req.connection.encrypted
    ? 'https' : 'http' + `://${req.headers.host}`
}