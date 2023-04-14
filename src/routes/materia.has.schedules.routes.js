import { Router } from 'express'
import { methods as msCtrl } from '../controllers/materia.has.schedules.controller'

const router = Router()

router.get('/api/ms/', msCtrl.getAll)
router.get('/api/mhs/:parameter', msCtrl.getOneByParameters)
router.post('/api/ms/', msCtrl.postOne)
router.put('/api/ms/:id', msCtrl.putOne)
router.delete('/api/ms/:id', msCtrl.deleteOne)

export default router