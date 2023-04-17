import { request, response } from 'express'
import { connect } from '../database/database'

//! Get Request => Get all attendances registration (student)
const getAll = async (req = request, res = response) => {
    try {
        const connection = await connect
        const result = await connection.query( //? SQL Query, uses inner join for relational tables
            `SELECT 
                URA.*, 
                A.professor_id, 
                A.materia_id, 
                A.schedule_id, 
                A.attendance_date,
                U.name AS student_name, 
                U.last_name AS student_last_name, 
                U.cuil AS student_cuil,
                UP.name AS professor_name, 
                UP.last_name AS professor_last_name, 
                UP.cuil AS professor_cuil, 
                M.materia_name, 
                S.class_day, 
                S.class_schedule,
                C.career_name 
            FROM user_register_attendance URA
            INNER JOIN users U ON URA.student_id = U.id 
            INNER JOIN attendance A ON URA.attendance_id = A.id 
            INNER JOIN materia M ON A.materia_id = M.id 
            INNER JOIN users UP ON M.professor_id = UP.id 
            INNER JOIN schedules S ON A.schedule_id = S.id 
            INNER JOIN career_contains_materia CCM ON A.materia_id = CCM.materia_id 
            INNER JOIN career C ON CCM.career_id = C.id`
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

//! Get Request => Get various records from the database
/**
 * 
 * @param {parameter} req type: string
 * @param {Json} res type: Json => Attendance info
 * 
 */
const getByParameter = async (req = request, res = response) => {
    const parameter = `%${req.params.parameter}%` //Get the parameter
    try {
        const connection = await connect
        const result = await connection.query(
            `SELECT
                URA.*, 
                A.professor_id, 
                A.materia_id, 
                A.schedule_id, 
                A.attendance_date,
                U.name AS student_name, 
                U.last_name AS student_last_name, 
                U.cuil AS student_cuil,
                UP.name AS professor_name, 
                UP.last_name AS professor_last_name, 
                UP.cuil AS professor_cuil, 
                M.materia_name, 
                S.class_day, 
                S.class_schedule, 
                C.career_name 
            FROM user_register_attendance URA 
            INNER JOIN users U ON URA.student_id = U.id 
            INNER JOIN attendance A ON URA.attendance_id = A.id 
            INNER JOIN materia M ON A.materia_id = M.id 
            INNER JOIN users UP ON M.professor_id = UP.id
            INNER JOIN schedules S ON A.schedule_id = S.id
            INNER JOIN career_contains_materia CCM ON A.materia_id = CCM.materia_id
            INNER JOIN career C ON CCM.career_id = C.id
            WHERE CONCAT(
                attendance_date, 
                U.name, 
                U.last_name, 
                U.cuil, 
                UP.name, 
                UP.last_name, 
                UP.cuil,
                materia_name, 
                class_day, 
                class_schedule, 
                career_name
            ) LIKE ?`, 
            parameter
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

//! Post Request => Post new record
/**
 * 
 * @param {none} req type: none
 * @param {Json} res type: Json Object => Information of the request
 * 
 */
const postOne = async (req = request, res = response) => {
    const ura = {  // Get the object
        student_id: req.body.student_id, 
        attendance_id: req.body.attendance_id 
    }
    try {
        const connection = await connect
        const result = await connection.query(
            `INSERT 
            INTO user_register_attendance 
            SET ?`, ura
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

//! Put Request => Edit a record from the database
/**
 * 
 * @param {id} req type: string
 * @param {Json} res type: Json Object => information of the put request
 * 
 */
const putOne = async (req = request, res = response) => {
    const id = req.params.id // Get the id
    const ura = { // Get the object
        student_id: req.body.student_id, 
        attendance_id: req.body.attendance_id 
    }
    try {
        const connection = await connect
        const result = await connection.query(
            `UPDATE 
            FROM user_register_attendance 
            SET ? 
            WHERE id = ?`, [ura, id]
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

//! Delete Request => Delete a record from the database
/**
 * 
 * @param {id} req type: string
 * @param {Json} res type: Json Object => Information of the request
 * 
 */
const deleteOne = async (req = request, res = response) => {
    const id = req.params.id // Get the id
    try {
        const connection = await connect
        const result = await connection.query(
            `DELETE 
            FROM user_register_attendance 
            WHERE id = ?`,id
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

export const methods = { 
    getAll, 
    getByParameter, 
    postOne, 
    putOne, 
    deleteOne 
}