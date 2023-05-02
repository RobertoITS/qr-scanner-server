import { Router } from 'express'
import { methods as teachersCtrl } from '../controllers/teachers.controller'

const router = Router()

router.get('/api/teachers/materias/:id', teachersCtrl.getMaterias)
router.get('/api/teachers/students/:id', teachersCtrl.getStudents)
router.get('/api/student-materias/:id', teachersCtrl.getStudentsAndMaterias)

export default router