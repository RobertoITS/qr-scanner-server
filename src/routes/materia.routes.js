import { Router } from 'express'
import { methods as materiaCtrl } from '../controllers/materia.controller'
import { check } from 'express-validator'
import { validator } from '../middlewares/fields.validator'


const router = Router()

router.post(
    '/api/materia/', [
        check('name', 'Name is required!').not().isEmpty(), 
        check('actual_year', 'Year is required').not().isEmpty()],
    materiaCtrl.postOne
    )

router.get('/api/materia', materiaCtrl.getAll)

router.get('/api/materia/:id', materiaCtrl.deleteOne)

router.put('/api/materia/:id', materiaCtrl.putOne)

router.delete('/api/materia/:id', materiaCtrl.deleteOne)