import { Router } from 'express'
import { methods as ccmCtrl } from '../controllers/career.contains.materia.controller'

//! Create the router (CRUD request from express)
const router = Router()

//! Get Request
router.get('/api/ccm/', ccmCtrl.getAll)

//! Get Request => Get various records from the database
router.get('/api/ccms/:parameter', ccmCtrl.getByParameters)

//! Post Request
router.post('/api/ccm/', ccmCtrl.postOne)

//! Put Request
router.put('/api/ccm/:id', ccmCtrl.putOne)

//! Delete Request
router.delete('/api/ccm/:id', ccmCtrl.deleteOne)

//! Export the router, import in app.js
export default router