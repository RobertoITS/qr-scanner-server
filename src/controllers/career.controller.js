import { request, response } from 'express'
import { connect } from '../database/database'

//! Post Request
/**
 * 
 * @param {Object} req type: string
 * @param {Json} res type Json => Response of the query
 */
const postOne = async (req = request, res = response) => {
    const career = { // Get the object
        career_name: req.body.career_name,
        description: req.body.description,
        duration: req.body.duration
    }
    try {
        const connection = await connect
        const result = await connection.query(
            `INSERT 
            INTO career 
            SET ?`, career)
        res.status(201).json({
            ok:true,
            result,
            msg: 'Created'
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
            FROM career 
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

//! Get Request
/**
 * 
 * @param {parameter} req type: string
 * @param {Json} res type: Json => Response of the query
 * 
 */
const getByParameters = async (req = request, res = response) => {
    //! Esta consulta busca un parametro en todas las columnas
    //* Los signos % son comodines para las busquedas avanzadas
    const parameter = `%${req.params.parameter}%`
    try {
        const connection = await connect
        const result = await connection.query(
            `SELECT * 
            FROM career 
            WHERE CONCAT(
                career_name, 
                description, 
                duration
            ) LIKE ?`, parameter
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

//! Get Request
const getAll = async (req = request, res = response) => {
    try {
        const connection = await connect
        const result = await connection.query(
            `SELECT * 
            FROM career`
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

//! Put Request
/**
 * 
 * @param {id.params, Object.body} req type: string
 * @param {Json} res type: Json => Response of the query
 * 
 */
const putOne = async (req = request, res = response) => {
    const id = req.params.id // Get the id
    const career = { // Get the object
        career_name: req.body.career_name,
        description: req.body.description,
        duration: req.body.duration
    }
    try {
        const connection = await connect
        const result = await connection.query(
            `UPDATE 
            career SET ? 
            WHERE id = ?`, [career, id])
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
            FROM career 
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

export const methods = { 
    postOne, 
    getAll, 
    getOne,
    putOne, 
    deleteOne, 
    getByParameters 
}