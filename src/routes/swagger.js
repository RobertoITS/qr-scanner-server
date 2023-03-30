const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

//* Metadata info about our API
const options = {
    definition: {
        openapi: '3.0.0',
        info: { tittle: 'QR-Scanner API', version: '1.0.0' }
    },
    apis: [ 'src/routes/users.routes.js' ]
}

//* Docs in JSON format
const swaggerSpec = swaggerJsDoc(options)

//* Functions to setup our docs
const swaggerDocs = (app, port) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.get('/api/docs.json', (req, res) => {
        res.setHeaders('Content-Type', 'application/json')
        res.render(swaggerSpec)
    })

    console.log(`Version 1 Docs are available at http://localhost:${port}/api/docs`)

}

module.exports = {
    swaggerDocs
}