import { Router } from 'express'
import { methods as usersCtr } from '../controllers/users.controller'

const router = Router()

//! Schema for user:
/**
 * @openapi
 * components:
 *  schemas:
 *   users:
 *    type: object
 *    properties:
 *     id:
 *      type: int
 *      example: 12
 *     name:
 *      type: string
 *      example: Mathias
 *     last_name:
 *      type: string
 *      example: O'Connor
 *     rol:
 *      type: string
 *      example: TEACHER
 *     user:
 *      type: string
 *      example: teacher123
 *     password:
 *      type: string
 *      example: teacher_password
 */

//! Register user Documentation:
/**
 * @openapi
 * /api/users:
 *  post:
 *   summary:
 *    Register a new user
 *   tags:
 *    - Users
 *   requestBody:
 *    description: Fields with user info - USER & PASSWORD REQUIRED*
 *    required: false
 *    content:
 *     application/json:
 *      schema:
 *       $ref: "#/components/schemas/users"
 *     application/x-www-form-urlencoded:
 *      schema:
 *       $ref: "#/components/schemas/users"
 *    responses:
 *     201:
 *      description: User created
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          ok:
 *           type: boolean
 *           example: true
 *          result:
 *           type: object
 *           properties:
 *            message: 
 *             type: string
 *             example: Some row count message
 *          msg:
 *           type: string
 *           example: Created
 *       400:
 *        description: ERROR
 *        content:
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *            ok:
 *             type: boolean
 *             example: false
 *            e:
 *             type: object
 *             properties:
 *              error: 
 *               type: string
 *               example: "Some error message"
 *             msg:
 *              type: string
 *              example: Error
 */
router.post('/api/users', usersCtr.register)


export default router