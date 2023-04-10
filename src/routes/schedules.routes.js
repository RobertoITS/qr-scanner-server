import { Router } from 'express'
import { methods as schedulesCtrl } from '../controllers/schedules.controller'
import { check } from 'express-validator'
import { validator } from '../middlewares/fields.validator'

const router = Router()

router.post('/api/schedules', [
        check('class_day', 'Class day is required').not().isEmpty(),
        check('class_schedule', 'Schedule class is required').not().isEmpty(),
        validator.fieldValidator
    ],
    schedulesCtrl.postOne
)

router.get('/api/schedules', schedulesCtrl.getAll)

router.get('/api/schedules/:id', schedulesCtrl.getOne)

router.put('/api/schedules/:id', schedulesCtrl.putOne)

router.delete('/api/schedules/:id', schedulesCtrl.deleteOne)

export default router