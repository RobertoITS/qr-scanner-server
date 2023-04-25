import { request, response } from 'express'
import { connect } from '../database/database'
import bcryptjs from 'bcryptjs'

/**
 * C = Create
 * R = Read
 * U = Update
 * D = Delete
 */

const availableUser = async (req = request, res = response) => { //! Check if user already exist
    const username = req.params.username
    try {
        const connection = await connect
        const result = await connection.query(
            `SELECT * 
            FROM users 
            WHERE user_name = ?`, 
            username
            )
        console.log(result);
        if (result.length != 0){
            res.status(200).json({
                ok: true,
                result,
                msg: 'User already exist'
            })
        }
        else {
            res.status(404).json({
                ok: true,
                result,
                msg: 'Available'
            })
        }
    }
    catch (e) {
        res.status(400).json({
            ok: false,
            e,
            msg: 'Rejected'
        })
    }
}

const availableCuil = async (req = request, res = response) => { //! Check if user already exist
    const cuil = req.params.cuil
    console.log(cuil);
    try {
        const connection = await connect
        const result = await connection.query(
            `SELECT * 
            FROM users 
            WHERE cuil = ?`, 
            cuil
            )
        console.log(result);
        if (result.length != 0){
            res.status(200).json({
                ok: true,
                result,
                msg: 'Cuil already registered'
            })
        }
        else {
            res.status(404).json({
                ok: true,
                result,
                msg: 'Not registered'
            })
        }
    }
    catch (e) {
        res.status(400).json({
            ok: false,
            e,
            msg: 'Rejected'
        })
    }
}

//! Post request => Creates a new user
/**
 * 
 * @param {req.body} req type: Json => (User information // REMEMBER: username = cuil)
 * @param {result} res type: Json => Server response (200, 400, 404)
 * 
 */
const register = async (req = request, res = response) => {
    //* Encrypt the password
    let passwordHash = await bcryptjs.hash(req.body.pass, 8)
    //* Create the object
    const object = { 
        last_name: req.body.last_name, 
        name: req.body.name, 
        cuil: req.body.cuil, 
        dir: req.body.dir, 
        phone_number: req.body.phone_number, 
        birthdate: req.body.birthdate, 
        age: req.body.age, 
        email: req.body.email, 
        user_name: req.body.user_name, 
        pass: passwordHash, 
        role: req.body.role, 
        file_number: req.body.file_number 
    }
    try {
        
        const connection = await connect
        const result = await connection.query(
            `INSERT 
            INTO users 
            SET ?`, 
            object
            ) //! SQL query
        res.status(201).json({
            ok: true,
            object, //* Returns the object (user info)
            result, //* Result of the query
            msg: 'Created'
        })
    
    }
    catch(e) { //! ERROR
        res.status(400).json({
            ok: false,
            e,
            msg: 'Error'
        })
    }
}

//! Get Request => Returns User information
/**
 * 
 * @param {req.params.username} req type: string
 * @param {result} res type: Json => User info
 * 
 */
const getOne = async (req = request, res = response) => {
    const id = req.params.id //* Require username from body as "username"
    try {
        const connection = await connect
        const result = await connection.query(
            `SELECT * 
            FROM users 
            WHERE id = ?`, 
            [id]
            ) //! SQL query
        if(result.length != 0) {
            res.status(200).json({
                ok: true,
                result, //* Returned data => User information (json object)
                msg: 'Found'
            })
        }
        else {
            res.status(404).json({ //! If the user not exist
                ok: true,
                result,
                msg: 'Not found'
            })
        }
    }
    catch (e) {
        res.status(400).json({
            ok: false,
            e, //* Return error information
            msg: 'Error'
        })
    }
}

//! Get Request => Get all users
const getAll = async (req = request, res = response) => {
    try {
        const connection = await connect
        const result = await connection.query(
            `SELECT * 
            FROM users`
            )
        res.status(200).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }
    catch (e) {
        res.status(400).json({
            ok: false,
            e,
            msg: 'Rejected'
        })
    }
}


//! Get Request => Get users by one parameter in various columns
/**
 * 
 * @param {parameter} req type: string
 * @param {object} res type: Json => user info
 * 
 */
const getByParameters = async (req = request, res = response) => {
    const parameter = `%${req.params.parameter}%`
    try {
        const connection = await connect
        const result = await connection.query( // Query concat various columns
            `SELECT * 
            FROM users 
            WHERE CONCAT(
                last_name, 
                name, 
                cuil, 
                id, 
                phone_number, 
                email, 
                age, 
                birthdate, 
                file_number, 
                user_name
                ) LIKE ?`,
            parameter
        )
        res.status(200).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }
    catch (e) {
        res.status(400).json({
            ok:false,
            e,
            msg: 'Rejected'
        })
    }
}

//! Put Request => Edit one user
/**
 * 
 * @param {id, object} req params, body
 * @param {result} res array
 */
const putOne = async (req = request, res = response) => {
    const id = req.params.id //* Get user data from headers

    const user = { //* Get user data from body
        last_name: req.body.last_name,
        name: req.body.name,
        cuil: req.body.cuil,
        dir: req.body.dir,
        phone_number: req.body.phone_number,
        birthdate: req.body.birthdate,
        age: req.body.age,
        email: req.body.email,
        user_name: req.body.user_name,
        pass: req.body.pass,
        role: req.body.role,
        file_number: req.body.file_number
    }

    try {
        const connection = await connect
        const result = await connection.query(
            `UPDATE users 
            SET ? 
            WHERE id = ?`, 
            [user, id]
            )
        res.status(200).json({
            ok: true,
            result,
            msg: 'Edited'
        })
    }
    catch(e){
        res.status(400).json({
            ok: false,
            e,
            msg: 'Rejected'
        })
    }
}

//! Delete Request => Deletes one record
/**
 * 
 * @param {id} req params
 * @param {result} res array
 */
const deleteOne = async (req = request, res = response) => {
    const id = req.params.id //* Get user data from headers
    try {
        const connection = await connect
        const result = await connection.query(
            `DELETE 
            FROM users 
            WHERE id = ?`,
            id
            )
        if(result.affectedRows != 0) {
            res.status(200).json({
                ok: true,
                result,
                msg: 'Deleted'
            })
        }
        else {
            res.status(404).json({
                ok: true,
                msg: 'Not found'
            })
        }
    }
    catch(e) {
        res.status(400).json({
            ok: false,
            e,
            msg: 'Rejected'
        })
    }
}

//! Get Request => Get users info, only teachers
/**
 * 
 * @param {none} req none
 * @param {Json.teachers} res type: Json => User teachers info
 */
const getTeachers = async (req = request, res = response) => {
    try {
        const connection = await connect
        const result = await connection.query(
            `SELECT * 
            FROM users 
            WHERE role = 'TEACHER'`
            )
        res.status(200).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }
    catch(e) {
        res.status(400).json({
            ok: false,
            e,
            msg: 'Rejected'
        })
    }
}



export const methods = { 
    register, 
    getOne, 
    getAll, 
    putOne, 
    deleteOne, 
    getTeachers, 
    availableUser, 
    availableCuil, 
    getByParameters,
}