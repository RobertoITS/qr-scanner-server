import { Router } from 'express'
import { methods } from '../controllers/auth.controller'

//! Create the router (CRUD request from express)
const router = Router()

/**
 * This ROUTES are for users authentication
 * Contains the  endpoints for the user's login
 * ! FOR USER ADMINISTRATION, VIEW THE LOGIC IN user.routes.js
 */

router.post('/api/auth/login', methods.login)

//! Export the router, import in app.js
export default router