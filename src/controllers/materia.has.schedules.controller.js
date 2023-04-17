import { connect } from "../database/database";
import { response, request } from 'express'

//! Get Request
/**
 * 
 * @param {none} req none
 * @param {Json} res type: Json => Response of the query
 * 
 * Gets all schedules registered of al the materias
 * 
 */
const getAll = async (req = request, res = response) => {
    try {
        const connection = await connect
        const result = await connection.query(
            `SELECT 
                MS.id, 
                MS.materia_id, 
                MS.schedule_id, 
                M.materia_name, 
                M.actual_year, 
                M.classes_quantity, 
                M.career_id, 
                S.class_day, 
                S.class_schedule, 
                (U.name) AS professor_name, 
                U.last_name, 
                U.cuil 
            FROM materia_has_schedules MS 
            INNER JOIN materia M ON MS.materia_id = M.id
            INNER JOIN schedules S ON MS.schedule_id = S.id
            INNER JOIN users U ON M.professor_id = U.id`)
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
    const parameter = `%${req.body.parameter}%` // Get the parameter
    try {
        const connection = await connect
        const result = await connection.query( //? --------------> Search professor, career, schedule day
            `SELECT 
                MS.id, 
                MS.materia_id, 
                MS.schedule_id, 
                M.materia_name, 
                M.actual_year, 
                M.classes_quantity, 
                M.career_id, 
                S.class_day, 
                S.class_schedule, 
                (U.name) AS professor_name, 
                U.last_name, 
                U.cuil 
            FROM materia_has_schedules MS 
            INNER JOIN materia M ON MS.materia_id = M.id
            INNER JOIN schedules S ON MS.schedule_id = S.id
            INNER JOIN users U ON U.id = M.professor_id
            INNER JOIN career C
            WHERE CONCAT(
                M.materia_name, 
                S.class_day, 
                U.name, 
                U.last_name, 
                U.cuil, 
                C.career_name, 
                S.class_day, 
                S.class_schedule) LIKE ?`, parameter
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

//! Post Request
/**
 * 
 * @param {Object.body} req type: Object
 * @param {Json} res type: Json => Response of the query
 * 
 */
const postOne = async (req = request, res = response) => {
    const ms = { // Get the object
        materia_id: req.body.materia_id, 
        schedule_id: req.body.schedule_id 
    }
    try {
        const connection = await connect
        const result = await connection.query(
            `INSERT 
            INTO materia_has_schedules 
            SET ?`, ms)
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
    const ms = { // Get the object
        materia_id: req.body.materia_id, 
        schedule_id: req.body.schedule_id 
    }
    try {
        const connection = await connect
        const result = await connection.query(
            `UPDATE 
            FROM materia_has_schedules 
            SET ? 
            WHERE id = ?`, [ms, id])
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
            FROM materia_has_schedules 
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
    getAll, 
    getByParameters, 
    postOne, 
    putOne, 
    deleteOne 
}