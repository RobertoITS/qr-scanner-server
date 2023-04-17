import { Router } from "express";
import { methods as attCtrl } from "../controllers/attendance.controller";

//! Create the router (CRUD request from express)
const router = Router()

//! Get Request
router.get('/api/attendance/', attCtrl.getAll)

//! Get Request => Get various records of the database
router.get('/api/attendances/:parameter', attCtrl.getByParameters)

//! Post Request
router.post('/api/attendance/', attCtrl.postOne)

//! Put Request
router.put('/api/attendance/:id', attCtrl.putOne)

//! Delete Request
router.delete('/api/attendance/:id', attCtrl.deleteOne)

//! Export the router, import in app.js
export default router