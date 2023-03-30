import { Router } from 'express'
import { methods } from '../controllers/auth.controller'

const router = Router()

/**
 * This ROUTES are for users authentication
 * Contains the  endpoints for the user's login
 * ! FOR USER ADMINISTRATION, VIEW THE LOGIC IN user.routes.js
 */

router.post('/api/auth/login', methods.login)

export default router