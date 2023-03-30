import express from 'express'
import morgan from 'morgan'
import session from 'express-session'
var cors = require('cors')

//* Routes
import userRoutes from './routes/users.routes'
import authRoutes from './routes/auth.routes'

//* Express
const app = express()

//* Cors
app.use(cors())

//* Settings
app.set('port', 3000) //! Port
app.use(express.urlencoded( { extended: false } ))
app.use(express.json())

//* MiddleWares
app.use(morgan('dev'))

//* Express - session
app.use(session({
    secret: 'secret', //! Secret seed for JWToken
    resave: true,
    saveUninitialized: true
}))

//* Routes direction
app.use( /* Routes */ userRoutes, authRoutes)

export default app