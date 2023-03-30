import app from './app'

//* Swagger documentation
const { swaggerDocs: V1SwaggerDocs } = require('./routes/swagger')

const main = () => {
    app.listen(app.get('port')) //* Get the port in app.js
    console.log(`Server on port ${app.get('port')}`)
    V1SwaggerDocs(app, app.get('port'))
}

main()