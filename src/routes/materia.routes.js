import { Router } from 'express'
import { methods as materiaCtrl } from '../controllers/materia.controller'
import { check } from 'express-validator'
import { validator } from '../middlewares/fields.validator'

//! Create the router (CRUD request from express)
const router = Router()

//! Post request
router.post(
    '/api/materia/', [
        check('materia_name', 'Name is required!').not().isEmpty(), // Validate the fields
        check('actual_year', 'Year is required').not().isEmpty(), validator.fieldValidator],
    materiaCtrl.postOne
    )

//! Get Request => Gets all
router.get('/api/materia/', materiaCtrl.getAll)

//! Get Request => Get one record
router.get('/api/materia/:id', materiaCtrl.getOne)

//! Put Request
router.put('/api/materia/:id', materiaCtrl.putOne)

//! Delete Request
router.delete('/api/materia/:id', materiaCtrl.deleteOne)

//! Get Request => Get various records
router.get('/api/materia/parameter/:parameter', materiaCtrl.getByParameter)

//! Export the router, import in app.js
export default router