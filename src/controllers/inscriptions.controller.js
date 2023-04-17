import { response, request } from 'express';
import { connect } from '../database/database';

//! Get Request
const getAll = async (req = request, res = response) => {
    try {
        const connection = await connect
        const result = await connection.query(
            `SELECT * 
            FROM inscriptions I 
            INNER JOIN materia M ON I.materia_id = M.id
            INNER JOIN users U ON I.student_id = U.id`
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
    console.log(parameter);
    try {
        const connection = await connect
        const result = await connection.query( //? ------------> Search student name, career
            `SELECT * 
            FROM inscriptions I 
            INNER JOIN materia M ON I.materia_id = M.id
            INNER JOIN users U ON I.student_id = U.id
            INNER JOIN career C
            WHERE CONCAT(
                U.name, 
                U.last_name, 
                U.cuil, 
                M.materia_name, 
                C.career_name) LIKE ?`, parameter
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

//! Post Request
/**
 * 
 * @param {Object} req type: string
 * @param {Json} res type: Json => Response of the query
 * 
 */
const postOne = async (req = request, res = response) => {
    const inscription = { // Get the object
        student_id: req.body.student_id, 
        materia_id: req.body.materia_id 
    }
    try {
        const connection = await connect
        const result = await connection.query(
            `INSERT 
            INTO inscriptions 
            SET ?`, inscription
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
    const inscription = { // Get the object
        student_id: req.body.student_id, 
        materia_id: req.body.materia_id 
    }
    try {
        const connection = await connect
        const result = await connection.query(
            `UPDATE inscriptions 
            SET ? 
            WHERE id = ?`, [inscription, id])
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
            FROM inscriptions 
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
    getAll, 
    getByParameters, 
    postOne, 
    putOne, 
    deleteOne 
}