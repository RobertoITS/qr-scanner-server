import { Router } from 'express'
import { methods as usersCtr } from '../controllers/users.controller'
import { check } from 'express-validator' //*Fields checker
import { validator } from '../middlewares/fields.validator' //* Fields validator
//! TESTING
import { jwtValidator } from '../middlewares/json.web.token.validator'

//! ----------------------- BEWARE ----------------------------
//! This routes are for Create, Read, Update and Delete users!!
//* NOT FOR LOGIN!! (View auth.routes.js)

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
 *     cuil:
 *      type: int
 *      example: 23000000007
 *     dir:
 *      type: string
 *      example: St. Anger 204
 *     email:
 *      type: string
 *      example: mail@mail.com
 *     phone:
 *      type: string
 *      example: +54 299 404 2303
 *     username:
 *      type: string
 *      example: username_example
 *     pass:
 *      type: string
 *      example: 123456
 *     role:
 *      type: string
 *      example: TEACHER
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
 *   responses:
 *    201:
 *     description: User created
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         ok:
 *          type: boolean
 *          example: true
 *         result:
 *          type: object
 *          properties:
 *           message: 
 *            type: string
 *            example: Some row count message
 *         msg:
 *          type: string
 *          example: Created
 *    400:
 *     description: ERROR
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         ok:
 *          type: boolean
 *          example: false
 *         e:
 *          type: object
 *          properties:
 *           error: 
 *            type: string
 *            example: "Some error message"
 *          msg:
 *           type: string
 *           example: Error
 */


router.post('/api/users', [
    //! Check the fields
    check('cuil', 'Cuil is required!').not().isEmpty(), check('username', 'User name is required').not().isEmpty(),
    check('pass', 'Password required!').not().isEmpty(), check('role', 'Role not defined'),
    validator.fieldValidator /** Validate the fields */ ] ,usersCtr.register) //! Register a new user

//! Testing!!
router.get('/api/users', jwtValidator.validateJwt, usersCtr.get)

export default router