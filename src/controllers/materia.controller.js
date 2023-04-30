import { response, request } from 'express'
import { connect } from '../database/database'

/**
 * C = Create
 * R = Read
 * U = Update
 * D = Delete
 */

//! Post Request
/**
 * 
 * @param {Object} req type: Object
 * @param {Json} res type: Json => Response of the query
 * 
 */
const postOne = async (req = request, res = response) => {
    const materia = { // Get the object
        materia_name: req.body.materia_name, 
        professor_id: req.body.professor_id, 
        actual_year: req.body.actual_year, 
        total_classes: req.body.total_classes, 
        career_id: req.body.career_id 
    }
    try {
        const connection = await connect
        const result = await connection.query(
            `INSERT 
            INTO materia 
            SET ?`, materia)
        res.status(201).json({
            ok: true,
            result,
            msg: 'Created'
        })
    }
    catch(e) {
        res.status(400).json({
            ok: false,
            e,
            msg: 'Error'
        })
    }
}

//! Get request
// Get all the records
const getAll = async (req = request, res = response) => {
    try {
        const connection = await connect
        const result = await connection.query(
            `SELECT * 
            FROM materia`
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

//! Get Request
/**
 * 
 * @param {id} req type: string
 * @param {Json} res type: Json => Response of the query
 * 
 */
const getOne = async (req = request, res = response) => {
    const id = req.params.id // Get the id
    try {
        const connection = await connect
        const result = await connection.query(
            `SELECT * 
            FROM materia 
            WHERE id = ?`, id)
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

//! Put Request
/**
 * 
 * @param {id.params, Object.body} req type: string
 * @param {Json} res type: Json => Response of the query
 * 
 */
const putOne = async (req = request, res = response) => {
    const id = req.params.id // Get the id
    const materia = { // Get the object
        materia_name: req.body.materia_name,
        professor_id: req.body.professor_id,
        actual_year: req.body.actual_year,
        total_classes: req.body.total_classes,
        career_id: req.body.career_id
    }
    try {
        const connection = await connect
        const result = await connection.query(
            `UPDATE materia 
            SET ? 
            WHERE id = ?`, [materia, id])
        res.status(200).json({
            ok: true,
            result,
            msg: 'Edited'
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

//! Delete Request
/**
 * 
 * @param {id} req type: string
 * @param {Json} res type: Json => Response of the query
 * 
 */
const deleteOne = async (req = request, res = response) => {
    const id = req.params.id // Get the id
    try {
        const connection = await connect
        const result = await connection.query(
            `DELETE 
            FROM materia 
            WHERE id = ?`, id)
        if(result.affectedRows != 0) { // If the record exist, it's deleted
            res.status(200).json({
                ok: true,
                result,
                msg: 'Deleted'
            })
        }
        else { // If the record did't exist, 404 not found
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

//! Get Request
/**
 * 
 * @param {parameter} req type: string
 * @param {Json} res type: Json => Response of the query
 * 
 */
const getByParameter = async (req = request, res = response) => {
    const parameter = `%${req.params.parameter}%` // Get the parameter
    try {
        const connection = await connect
        const result = await connection.query(
            `SELECT * 
            FROM materia 
            WHERE materia_name LIKE ?`, parameter)
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

//! Export the methods
export const methods = { 
    postOne, 
    getAll, 
    getOne, 
    putOne, 
    deleteOne, 
    getByParameter 
}