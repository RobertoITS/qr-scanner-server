import { Router } from 'express';
import { methods as inscriptionsCtrl } from '../controllers/inscriptions.controller';

const router = Router()

router.get('/api/inscriptions', inscriptionsCtrl.getAll)
router.get('/api/inscription/:parameter', inscriptionsCtrl.getOneByParameters)
router.post('/api/inscriptions/', inscriptionsCtrl.postOne)
router.put('/api/inscriptions/:id', inscriptionsCtrl.putOne)
router.delete('/api/inscriptions/:id', inscriptionsCtrl.deleteOne)

export default router