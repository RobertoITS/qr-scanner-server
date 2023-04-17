import { request, response } from 'express'
import { connect } from '../database/database'

/*
? This section is for queries of two relational tables
? All the queries uses INNER JOIN
*/

//! Get Request
const getAll = async (req = request, res = response) => {
    try {
        const connection = await connect
        const result = await connection.query(
            `SELECT 
                CCM.id, 
                CCM.career_id, 
                CCM.materia_id, 
                M.professor_id, 
                C.career_name, 
                C.duration, 
                M.materia_name, 
                M.actual_year, 
                M.classes_quantity, 
                (U.name) AS professor_name, 
                U.last_name, 
                U.cuil 
            FROM career_contains_materia CCM 
            INNER JOIN career C ON CCM.career_id = C.id
            INNER JOIN materia M ON CCM.materia_id = M.id
            INNER JOIN users U ON M.professor_id = U.id`
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
/**
 * 
 * @param {parameter} req type: string
 * @param {Json} res type: Json => Response of the query
 * 
 */
const getByParameters = async (req = request, res = response) => {
    const parameter = `%${req.params.parameter}%` // Get the parameter
    try {
        const connection = await connect
        const result = await connection.query(
            `SELECT 
                CCM.id, 
                CCM.career_id, 
                CCM.materia_id, 
                M.professor_id, 
                C.career_name, 
                C.duration, 
                M.materia_name, 
                M.actual_year, 
                M.classes_quantity, 
                (U.name) AS professor_name, 
                U.last_name, 
                U.cuil 
            FROM career_contains_materia CCM 
            INNER JOIN career C ON CCM.career_id = C.id
            INNER JOIN materia M ON CCM.materia_id = M.id
            INNER JOIN users U ON M.professor_id = U.id 
            WHERE CONCAT(
                C.career_name, 
                M.materia_name, 
                M.actual_year, 
                U.last_name, 
                U.name, 
                U.cuil, 
                U.user_name
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

//! Post Request
/**
 * 
 * @param {Object} req type: string
 * @param {Json} res type: Json => Response of the query
 * 
 */
const postOne = async (req = request, res = response) => {
    const ccm = { // Get the object
        materia_id: req.body.materia_id, 
        career_id: req.body.career_id 
    }
    try {
        const connection = await connect
        const result = await connection.query(
            `INSERT INT career_contains_materia 
            SET ?`, ccm
        )
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
    const ccm = { // Get the object
        materia_id: req.body.materia_id, 
        career_id: req.body.career_id 
    }
    try {
        const connection = await connect
        const result = await connection.query(
            `UPDATE career_contains_materia 
            SET ? 
            WHERE id = ?`, [ccm, id]
        )
        res.status(200).json({
            ok: true,
            result,
            msg: 'Approved'
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
            FROM career_contains_materia 
            WHERE id = ?`, id
        )
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
    catch (e) {
        res.status(400).json({
            ok: false,
            e,
            msg: 'Rejected'
        })
    }
}

//! Export the methods
export const methods = { 
    getAll, 
    getByParameters, 
    postOne, 
    putOne, 
    deleteOne 
}