import { Router } from 'express'
import { methods as commissionsCtrl } from '../controllers/commissions.controller'
import { check } from 'express-validator'
import { validator } from '../middlewares/fields.validator'

const router = Router()

router.post('/api/commissions', [
        check('name', 'Name is required').not().isEmpty(),
        check('class_day', 'Class day is required').not().isEmpty(),
        check('schedule_class', 'Schedule class is required').not().isEmpty(),
        validator.fieldValidator
    ],
    commissionsCtrl.postOne
)

router.get('/api/commissions', commissionsCtrl.getAll)

router.get('/api/commissions/:id', commissionsCtrl.getOne)

router.put('/api/commissions/:id', commissionsCtrl.putOne)

router.delete('/api/commissions/:id', commissionsCtrl.deleteOne)