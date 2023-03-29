import express from 'express'
import morgan from 'morgan'
var cors = require('cors')

//* Routes


//* Express
const app = express()

//* Cors
app.use(cors())

//* Settings
app.use('port', 3000) //! Port
app.use(express.urlencoded( { extended: false } ))
app.use(express.json())

//* MiddleWares
app.use(morgan('dev'))

//* Routes direction
app.use( /* Routes */ )

export default app