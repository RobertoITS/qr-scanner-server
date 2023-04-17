import { Router } from 'express'
import { methods as schedulesCtrl } from '../controllers/schedules.controller'
import { check } from 'express-validator'
import { validator } from '../middlewares/fields.validator'

//! Create the router (CRUD request from express)
const router = Router()

//! Post request
router.post('/api/schedules/', [
        check('class_day', 'Class day is required').not().isEmpty(),
        check('class_schedule', 'Schedule class is required').not().isEmpty(),
        validator.fieldValidator
    ],
    schedulesCtrl.postOne
)

//! Get request
router.get('/api/schedules/', schedulesCtrl.getAll)

//! Get request => get one
router.get('/api/schedules/:id', schedulesCtrl.getOne)

//! Put request
router.put('/api/schedules/:id', schedulesCtrl.putOne)

//! Delete request => delete one
router.delete('/api/schedules/:id', schedulesCtrl.deleteOne)

//! Get request => get various records
router.get('/api/schedule/:parameter', schedulesCtrl.getByParameter)

//! Export the router, import in app.js
export default router