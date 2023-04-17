import { Router } from 'express';
import { methods as inscriptionsCtrl } from '../controllers/inscriptions.controller';

//! Create the router (CRUD request from express)
const router = Router()

//! Get Request
router.get('/api/inscriptions', inscriptionsCtrl.getAll)

//! Get Request => Get various records from the database
router.get('/api/inscription/:parameter', inscriptionsCtrl.getByParameters)

//! Post request
router.post('/api/inscriptions/', inscriptionsCtrl.postOne)

//! Put Request
router.put('/api/inscriptions/:id', inscriptionsCtrl.putOne)

//! Delete Request
router.delete('/api/inscriptions/:id', inscriptionsCtrl.deleteOne)

//! Export the router, import in app.js
export default router