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
    let classes_quantity = 0 //! -----------------> Classes quantity variable
    
    const connection = await connect
    connection.beginTransaction() //? Start transaction

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
        schedule_id: req.body.schedule_id
    }
    //? ----------------------- GET REQUEST ------------------------
    try {
        const result = await connection.query( //! Obtains classes quantity from materia
            `SELECT classes_quantity FROM materia WHERE id = ?`, attendance.materia_id
        )
        if(result[0].classes_quantity == null || result[0].classes_quantity == "null"){ //! Adds one more classes to the materia
            classes_quantity = 1
        }
        else {
            classes_quantity = result[0].classes_quantity + 1
        }
        //? ----------------------- PUT REQUEST ------------------------
        try {
            await connection.query(
                `UPDATE materia
                SET classes_quantity = ?
                WHERE id = ?`, [classes_quantity, attendance.materia_id]
            )
            //? ----------------------- POST REQUEST ------------------------
            try {
                const postResult = await connection.query( //! Then, insert al the data
                    `INSERT 
                    INTO attendance 
                    SET ?`, attendance
                )
                connection.commit() //? Commit all changes
                res.status(201).json({
                    ok: true,
                    postResult,
                    id: +id,
                    msg: 'Created'
                })
            }
            catch (e) {
                connection.rollback() //? RollBack all changes
                res.status(400).json({
                    ok: false,
                    e,
                    msg: 'Rejected'
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
    catch (e){
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
//! VER SI SE PUEDE MEJORAR
const deleteOne = async (req = request, res = response) => {
    const id = req.params.id // Get the id
    let classes_quantity = 0
    const connection = await connect
    await connection.beginTransaction() //? Start transaction of queries
    try {
        const result = await connection.query(
            `SELECT * FROM attendance WHERE id = ?`, id
        )
        const materia_id = result[0].materia_id
        try {
            const result = await connection.query(
                `SELECT classes_quantity FROM materia WHERE id = ?`, materia_id
            )
            classes_quantity = result[0].classes_quantity - 1 // <------------ Subtract une class to materia
            try {
                await connection.query(
                    `UPDATE materia
                    SET classes_quantity = ?
                    WHERE id = ?`, [classes_quantity, materia_id]
                )
                try {
                    await connection.query( //! DELETE ALL THE REFERENCES!!
                        `DELETE FROM user_register_attendance WHERE attendance_id = ?`, id
                    )
                    const result = await connection.query( //! Delete entry
                        `DELETE FROM attendance WHERE id = ?`, id
                    )
                    
                    connection.commit() //? If succeed, commit all changes
                    res.status(200).json({
                        ok: true,
                        result,
                        msg: 'Deleted'
                    })
                }
                catch (e) {
                    connection.rollback() //? Else, rollback all the changes
                    res.status(400).json({
                        ok: false,
                        e,
                        msg: 'Rejected'
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
        catch (e) {
            res.status(400).json({
                ok: false,
                e,
                msg: 'Rejected'
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
    getByParameters, 
    postOne, 
    putOne, 
    deleteOne 
}