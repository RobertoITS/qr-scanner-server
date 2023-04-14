import { response, request } from 'express'
import { connect } from '../database/database'

const getAll = async (req = request, res = response) => {
    try {
        const connection = await connect
        const result = await connection.query(
            'select A.*, (U.name) as professor_name, U.last_name, U.cuil, U.user_name, M.materia_name, M.actual_year, M.classes_quantity, S.class_day, S.class_schedule from attendance A ' +
            'inner join users U on A.professor_id = U.id ' +
            'inner join materia M on A.materia_id = M.id ' +
            'inner join schedules S on A.schedule_id = S.id'
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

const getOneByParameters = async (req = request, res = response) => {
    const parameter = `%${req.params.parameter}%`
    try {
        const connection = await connect
        const result = await connection.query(
            'select A.*, (U.name) as professor_name, U.last_name, U.cuil, U.user_name, M.materia_name, M.actual_year, M.classes_quantity, S.class_day, S.class_schedule from attendance A ' +
            'inner join users U on A.professor_id = U.id ' +
            'inner join materia M on A.materia_id = M.id ' +
            'inner join schedules S on A.schedule_id = S.id ' +
            'where concat(A.attendance_date, U.name, U.last_name, U.cuil, U.user_name, M.materia_name, M.actual_year, S.class_day, S.class_schedule) like ?', parameter
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

const postOne = async (req = request, res = response) => {
    const attendance = { attendance_date: req.body.attendance_date, professor_id: req.body.professor_id, materia_id: req.body.materia_id, schedule_id: req.body.schedule_id }
    try {
        const connection = await connect
        const result = await connection.query(
            'insert into attendance set ?', attendance
        )
        res.status(201).json({
            ok: true,
            result,
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

const putOne = async (req = request, res = response) => {
    const id = req.params.id
    const attendance = { attendance_date: req.body.attendance_date, professor_id: req.body.professor_id, materia_id: req.body.materia_id, schedule_id: req.body.schedule_id }
    try {
        const connection = await connect
        const result = await connection.query(
            'update attendance set ? where id = ?', [attendance, id]
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

const deleteOne = async (req = request, res = response) => {
    const id = req.params.id
    try {
        const connection = await connect
        const result = await connection.query(
            'delete from attendance where id = ?', id
        )
        res.status(200).json({
            ok: true,
            result,
            msg: 'Deleted'
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

export const methods = { getAll, getOneByParameters, postOne, putOne, deleteOne }