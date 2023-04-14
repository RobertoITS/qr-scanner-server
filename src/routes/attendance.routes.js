import { Router } from "express";
import { methods as attCtrl } from "../controllers/attendance.controller";

const router = Router()

router.get('/api/attendance/', attCtrl.getAll)
router.get('/api/attendances/:parameter', attCtrl.getOneByParameters)
router.post('/api/attendance/', attCtrl.postOne)
router.put('/api/attendance/:id', attCtrl.putOne)
router.delete('/api/attendance/:id', attCtrl.deleteOne)

export default router