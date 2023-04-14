import { Router } from 'express'
import { methods as ccmCtrl } from '../controllers/career.contains.materia.controller'

const router = Router()

router.get('/api/ccm/', ccmCtrl.getAll)
router.get('/api/ccms/:parameter', ccmCtrl.getOneByParameters)
router.post('/api/ccm/', ccmCtrl.postOne)
router.put('/api/ccm/:id', ccmCtrl.putOne)
router.delete('/api/ccm/:id', ccmCtrl.deleteOne)

export default router