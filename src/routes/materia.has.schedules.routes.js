import { Router } from 'express'
import { methods as msCtrl } from '../controllers/materia.has.schedules.controller'

//! Create the router (CRUD request from express)
const router = Router()

//! Get request (all)
router.get('/api/ms/', msCtrl.getAll)

//! Get request (various - from parameter)
router.get('/api/mhs/:parameter', msCtrl.getByParameters)

//! Post request
router.post('/api/ms/', msCtrl.postOne)

//! Put request
router.put('/api/ms/:id', msCtrl.putOne)

//! Delete request
router.delete('/api/ms/:id', msCtrl.deleteOne)

//! Exports the router, import in app.js
export default router