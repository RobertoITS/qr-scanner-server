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
import inscriptionsRoutes from './routes/inscriptions.routes'
import msRoutes from './routes/materia.has.schedules.routes'
import ccmRoutes from './routes/career.contains.materia.routes'
import attRoutes from './routes/attendance.routes'
import uraRoutes from './routes/user.register.attendance.routes'
import studentRoutes from './routes/student.routes'
import teacherRoutes from './routes/teachers.routes'

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
app.use(
    /* Routes */ 
    userRoutes, 
    authRoutes, 
    careerRoutes, 
    schedulesRoutes, 
    materiaRoutes, 
    inscriptionsRoutes, 
    msRoutes, 
    ccmRoutes, 
    attRoutes,
    uraRoutes,
    studentRoutes,
    teacherRoutes
)

export default app