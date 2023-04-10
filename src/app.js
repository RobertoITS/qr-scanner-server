import express from 'express'
import morgan from 'morgan'
import session from 'express-session'
var cors = require('cors')

//* Routes
import userRoutes from './routes/users.routes'
import authRoutes from './routes/auth.routes'
import careerRoutes from './routes/career.routes'
import schedulesRoutes from './routes/schedules.routes'
import materiaRoutes from './routes/materia.routes'

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
app.use( /* Routes */ userRoutes, authRoutes, careerRoutes, schedulesRoutes, materiaRoutes)

export default app