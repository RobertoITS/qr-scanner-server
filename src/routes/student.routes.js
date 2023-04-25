import { Router } from "express";
import { methods as studentCtrl } from "../controllers/student.controller";


const router = Router()

//! Get attendance info
router.get('/api/student/attendance-info/:id', studentCtrl.getAttendances)

//! Get materias info
router.get('/api/student/materias-info/:id', studentCtrl.getMaterias)

export default router