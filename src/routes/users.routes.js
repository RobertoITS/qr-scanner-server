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
 *      type: number
 *      example: 12
 *     last_name:
 *      type: string
 *      example: O'Connor
 *     name:
 *      type: string
 *      example: Mathias
 *     cuil:
 *      type: string
 *      example: 23000000007
 *     dir:
 *      type: string
 *      example: St. Anger 204
 *     phone_number:
 *      type: string
 *      example: +54 299 154054054
 *     birthdate:
 *      type: string
 *      example: 01/01/1990
 *     age:
 *      type: number
 *      example: 32
 *     email:
 *      type: string
 *      example: mail@mail.com
 *     user_name:
 *      type: string
 *      example: username_example
 *     pass:
 *      type: string
 *      example: 123456
 *     role:
 *      type: string
 *      example: PROFESOR
 *     file_number:
 *      type: string
 *      example: 123
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
 *    302:
 *     description: User name already exist
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         ok:
 *          type: boolean
 *          example: false
 *         msg:
 *          type: string
 *          example: Already exist
 */

//! Get user Documentation:
/**
 * @openapi
 * /api/users/{username}:
 *  get:
 *   summary:
 *    Returns user's information
 *   tags:
 *    - Users
 *   parameters:
 *    - in: path
 *      name: username
 *      schema:
 *       type: string
 *      description: Username
 *      required: true
 *   responses:
 *    200:
 *     description: User found
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         ok:
 *          type: boolean
 *          example: true
 *         result:
 *          type: array
 *          items:
 *           $ref: "#/components/schemas/users"
 *         msg:
 *          type: string
 *          example: Found
 *    404:
 *     description: No content
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         ok:
 *          type: boolean
 *          example: true
 *         result:
 *          type: string
 *          properties:
 *           error: 
 *            type: string
 *            example: "SQL message"
 *         msg:
 *          type: string
 *          example: Not found
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
 *         msg:
 *          type: string
 *          example: Error
 */

//! Get all users:
/**
 * @openapi
 * /api/users/:
 *  get:
 *   summary:
 *    Get all users
 *   tags:
 *    - Users
 *   responses:
 *    200:
 *     description: Information of all users
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         ok:
 *          type: boolean
 *          example: true
 *         result:
 *          type: array
 *          items:
 *           $ref: "#/components/schemas/users"
 *         msg:
 *          type: string
 *          example: Approved
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
 *           msg:
 *            type: string
 *            example: Rejected
 */

//! Delete one user
/**
 * @openapi
 * /api/users/{id}:
 *  delete:
 *   summary:
 *    Delete one record from the database
 *   tags:
 *    - Users
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: number
 *      description: The id of a user
 *   responses:
 *    200:
 *     description: Information of one user
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
 *            example: "Some row count message"
 *         msg:
 *          type: string
 *          example: Approved
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
 *         msg:
 *          type: string
 *          example: Rejected
 *    404:
 *     description: Not found
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         ok:
 *          type: boolean
 *          example: true
 *         msg:
 *          type: string
 *          example: Not found
 */

router.post('/api/users', [
    //! Check the fields
    check('cuil', 'Cuil is required!').not().isEmpty(), check('user_name', 'User name is required').not().isEmpty(),
    check('pass', 'Password required!').not().isEmpty(), check('role', 'Role not defined'),
    validator.fieldValidator /** Validate the fields */ ], jwtValidator.validateJwt ,usersCtr.register) //! Register a new user

//! Get One record from the database
/** Route protected, needs authentication to proceed
 * View Json Web Token documentation for more
 */
router.get('/api/users/:id', jwtValidator.validateJwt, usersCtr.getOne)

//! Get various records from database
router.get('/api/users/parameters/:parameter', jwtValidator.validateJwt ,usersCtr.getByParameters)

//! Check if user name is available
router.get('/api/users/available-user-name/:username', jwtValidator.validateJwt, usersCtr.availableUser)
router.get('/api/users/available-cuil/:cuil', jwtValidator.validateJwt, usersCtr.availableCuil)

//! Get all records from the database
router.get('/api/users/', jwtValidator.validateJwt,usersCtr.getAll)

//! Get only teachers
router.get('/api/teachers/', jwtValidator.validateJwt, usersCtr.getTeachers)

//! Delete one record from the database
router.delete('/api/users/:id', jwtValidator.validateJwt, usersCtr.deleteOne)

//! Put one
router.put('/api/users/:id', jwtValidator.validateJwt, usersCtr.putOne)

export default router