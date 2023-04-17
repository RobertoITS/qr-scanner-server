import { Router } from 'express'
import { methods as careerCtrl } from '../controllers/career.controller'
import { check } from 'express-validator'
import { validator } from '../middlewares/fields.validator'

//! Create the router (CRUD request from express)
const router = Router()

//! Post Request
router.post('/api/career', [
        check('career_name', 'Name is required').not().isEmpty(), // Fields validators
        check('duration', 'Duration is required').not().isEmpty(),
        validator.fieldValidator
    ],
    careerCtrl.postOne
)

//! Get Request
router.get('/api/career', careerCtrl.getAll)

//! Get Request => Get various records from the database
router.get('/api/careers/:parameter', careerCtrl.getByParameters)

//! Get Request => Get one record from the database
router.get('/api/career/:id', careerCtrl.getOne)

//! Put Request
router.put('/api/career/:id', careerCtrl.putOne)

//! Delete Request
router.delete('/api/career/:id', careerCtrl.deleteOne)

//! Export the router, import in app.js
export default router