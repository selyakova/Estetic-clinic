const app = require('express')();
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

app.get('/Estetic-clinic', (req, res) => {
    res.send(estetic)
})

app.get('/Estetic-clinic', (req, res) => {
    res.send(estetic)
})

app.get('/Estetic-clinic/:id', (req,res) => {
    if (typeof estetic[req.params.id -1] === 'undifined')
    {
        return res.status(404).send({error: "Service not found"})
    }
    res.send(estetic[req.params.id - 1])
})

app.post('/Estetic-clinic', (req, res) => {
    estetic.push({
        id: estetic.length +1,
        price: req.body.price,
        name: req.body.name
    })
    res.end()
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})