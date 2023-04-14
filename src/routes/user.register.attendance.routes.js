import { Router } from "express";
import { methods as uraCtrl } from '../controllers/user.register.attendance.controller'

const router = Router()

router.get('/api/ura/', uraCtrl.getAll)
router.get('/api/uraS/:parameter', uraCtrl.getOneByParameter)
router.post('/api/ura/', uraCtrl.postOne)
router.put('/api/ura/', uraCtrl.putOne)
router.delete('/api/ura/', uraCtrl.deleteOne)

export default router