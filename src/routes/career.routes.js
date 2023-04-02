import { Router } from 'express'
import { methods as careerCtrl } from '../controllers/career.controller'
import { check } from 'express-validator'
import { validator } from '../middlewares/fields.validator'

const router = Router()

router.post('/api/career', [
        check('name', 'Name is required').not().isEmpty(),
        check('duration', 'Duration is required').not().isEmpty(),
        validator.fieldValidator
    ],
    careerCtrl.postOne
)

router.get('/api/career', careerCtrl.getAll)

router.get('/api/career/:id', careerCtrl.getOne)

router.put('/api/career/:id', careerCtrl.putOne)

router.delete('/api/career/:id', careerCtrl.deleteOne)