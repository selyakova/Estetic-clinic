const express = require('express')
const app = express()

//const app = require('express')();
const port = 8080
const swaggerUi = require('swagger-ui-express')
const yamljs = require('yamljs')
const swaggerDocument = yamljs.load('./docs/swagger.yaml');
//const swaggerDocument = require('./docs/swagger.json');



const estetic = [
    {id: 1, name: "Botox", price:250},
    {id: 2, name:"LPG massage", price:70},
    {id: 3, name:"Manual teraphy", price:90}
]

app.get('/Esteticclinic', (req, res) => {
    res.send(estetic)
})

app.get('/Esteticclinic', (req, res) => {
    res.send(estetic)
})

app.get('/Esteticclinic/:id', (req,res) => {
    if (typeof estetic[req.params.id -1] === 'undifined')
    {
        return res.status(404).send({error: "Service not found"})
    }
    res.send(estetic[req.params.id - 1])
})

app.post('/Esteticclinic', (req, res) => {
    if (!req.body.name || !req-body.price) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    let estserv = { 
        id: estetic.length +1,
        price: req.body.price,
        name: req.body.name
    }
    estetic.push(estserv)
    res.status(201)
    .location(`${getBaseUrl(req)}/Esteticclinic/${estetic.length}`)
    .send(estserv)
})


app.use(express.json())

app.delete('/Esteticclinic/:id', (req, res) => {
    if (typeof estetic[req.params-id - 1] === 'undefined') {
        return res.status(404).send({error: "Service not found"})
    }
    estetic.splice(req.params.id -1, 1)

    res.status(204).send({error: "No content"})
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})

function getBaseUrl(req) {
    return req.connection && req.connection.encrypted
    ? 'https' : 'http' + `://${req.headers.host}`
}