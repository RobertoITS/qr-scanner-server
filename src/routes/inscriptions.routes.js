import { Router } from 'express';
import { methods as inscriptionsCtrl } from '../controllers/inscriptions.controller';

const router = Router()

router.get('/api/inscriptions', inscriptionsCtrl.getAll)

export default router