import { response, request } from 'express'
import { connect } from '../database/database'

//! Get Request
const getAll = async (req = request, res = response) => {
    try {
        const connection = await connect
        const result = await connection.query(
            `SELECT 
                A.*, 
                (U.name) AS professor_name, 
                U.last_name, 
                U.cuil, 
                U.user_name, 
                M.materia_name, 
                M.actual_year, 
                M.classes_quantity as total_classes, 
                S.class_day, 
                S.class_schedule 
            FROM attendance A 
            INNER JOIN users U ON A.professor_id = U.id 
            INNER JOIN materia M ON A.materia_id = M.id 
            INNER JOIN schedules S ON A.schedule_id = S.id`
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
                A.*, (U.name) AS professor_name, 
                U.last_name, 
                U.cuil, 
                U.user_name, 
                M.materia_name, 
                M.actual_year, 
                M.classes_quantity, 
                S.class_day, 
                S.class_schedule 
            FROM attendance A 
            INNER JOIN users U ON A.professor_id = U.id 
            INNER JOIN materia M ON A.materia_id = M.id 
            INNER JOIN schedules S ON A.schedule_id = S.id 
            WHERE CONCAT(
                A.attendance_date, 
                U.name, 
                U.last_name, 
                U.cuil, 
                U.user_name, 
                M.materia_name, 
                M.actual_year, 
                S.class_day, 
                S.class_schedule
            ) LIKE ?`, parameter
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
//! When creating a new assist, it first counts the amount already created, 
//! and adds one more to the field
//? In short, the materia brings the totally of classes,
//? The attendance, the quantity of classes given at the actual date
//? And the student, the quantity of classes attended (givenList.length)
const postOne = async (req = request, res = response) => {
    
    //! GET THE ACTUAL DATE (SERVER LOCAL)
    //? -------------------------------->
    const date = new Date()
    const yyyy = date.getFullYear().toString()
    let dd = (date.getDate()).toString()
    if (dd.length < 2) dd = `0${dd}`
    let mm = (date.getMonth()+1).toString()
    if (mm.length < 2) mm = `0${mm}`
    const today = `${dd}/${mm}/${yyyy}`
    console.log(today);
    //? -------------------------------->

    //! GENERATE THE ID
    //? -------------------------------->
    const id = dd + mm + yyyy + req.body.professor_id + req.body.materia_id + req.body.schedule_id
    console.log(id)
    //? -------------------------------->

    const attendance = { // Get the object
        id: id, //? ---------> GENERATED ID
        attendance_date: today, //? ---------> SERVER DATE
        professor_id: req.body.professor_id, 
        materia_id: req.body.materia_id, 
        schedule_id: req.body.schedule_id,
        classes_quantity: 0 //? Classes quantity, for now, value = 0
    }
    try {
        const connection = await connect
        const result = await connection.query( //! First, obtain the quantity of attendance created
            `SELECT COUNT(id) AS classes_quantity 
            FROM attendance 
            WHERE materia_id = ?`, attendance.materia_id)
        attendance.classes_quantity = result[0].classes_quantity + 1 //! Add une to the actual quantity
        try {
            const connection = await connect
            const result = await connection.query( //! Then, insert al the data
                `INSERT 
                INTO attendance 
                SET ?`, attendance
            )
            res.status(201).json({
                ok: true,
                result,
                id: id,
                msg: 'Created'
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
    catch(e){
        res.status(400).json({
            ok:false,
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
    const id = req.params.id // get the id
    const attendance = { 
        attendance_date: req.body.attendance_date, 
        professor_id: req.body.professor_id, 
        materia_id: req.body.materia_id, 
        schedule_id: req.body.schedule_id 
    }
    try {
        const connection = await connect
        const result = await connection.query(
            `UPDATE attendance 
            SET ? 
            WHERE id = ?`, [attendance, id]
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
            FROM attendance 
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

export const methods = { 
    getAll, 
    getByParameters, 
    postOne, 
    putOne, 
    deleteOne 
}