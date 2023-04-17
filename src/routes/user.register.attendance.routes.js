import { Router } from "express";
import { methods as uraCtrl } from '../controllers/user.register.attendance.controller'

//! Create the router (CRUD request from express)
const router = Router()


//! Get all the records from the database
router.get('/api/ura/', uraCtrl.getAll)

//! Get various records from the database of one parameter
router.get('/api/uraS/:parameter', uraCtrl.getByParameter)

//! Post a new record in the database
router.post('/api/ura/', uraCtrl.postOne)

//! Edit one record in the database
router.put('/api/ura/:id', uraCtrl.putOne)

//! Delete one record from the database
router.delete('/api/ura/:id', uraCtrl.deleteOne)

//! Export the router, import in app.js
export default router