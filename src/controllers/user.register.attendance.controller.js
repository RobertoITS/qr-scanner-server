import { request, response } from 'express'
import { connect } from '../database/database'

const getAll = async (req = request, res = response) => {
    try {
        const connection = await connect
        const result = await connection.query(
            'select ura.*, a.professor_id, a.materia_id, a.schedule_id, a.attendance_date,(u.name) as student_name, (u.last_name) as student_last_name, (u.cuil) as student_cuil, ' +
            '(up.name) as professor_name, (up.last_name) as professor_last_name, (up.cuil) as professor_cuil, m.materia_name, s.class_day, s.class_schedule, ' +
            'c.career_name from user_register_attendance ura ' +
            'inner join users u on ura.student_id = u.id ' +
            'inner join attendance a on ura.attendance_id = a.id ' +
            'inner join materia m on a.materia_id = m.id ' +
            'inner join users up on m.professor_id = up.id ' +
            'inner join schedules s on a.schedule_id = s.id ' +
            'inner join career_contains_materia ccm on a.materia_id = ccm.materia_id ' +
            'inner join career c on ccm.career_id = c.id'
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

const getOneByParameter = async (req = request, res = response) => {
    const parameter = `%${req.params.parameter}%`
    try {
        const connection = await connect
        const result = await connection.query(
            'select ura.*, a.professor_id, a.materia_id, a.schedule_id, a.attendance_date,(u.name) as student_name, (u.last_name) as student_last_name, (u.cuil) as student_cuil, ' +
            '(up.name) as professor_name, (up.last_name) as professor_last_name, (up.cuil) as professor_cuil, m.materia_name, s.class_day, s.class_schedule, ' +
            'c.career_name from user_register_attendance ura ' +
            'inner join users u on ura.student_id = u.id ' +
            'inner join attendance a on ura.attendance_id = a.id ' +
            'inner join materia m on a.materia_id = m.id ' +
            'inner join users up on m.professor_id = up.id ' +
            'inner join schedules s on a.schedule_id = s.id ' +
            'inner join career_contains_materia ccm on a.materia_id = ccm.materia_id ' +
            'inner join career c on ccm.career_id = c.id ' +
            'where concat(attendance_date, u.name, u.last_name, u.cuil, up.name, up.last_name, up.cuil,materia_name, class_day, class_schedule, career_name) like ?', parameter
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
    const ura = { student_id: req.body.student_id, attendance_id: req.body.attendance_id }
    try {
        const connection = await connect
        const result = await connection.query(
            'insert into user_register_attendance set ?', ura
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

const putOne = async (req = request, res = response) => {
    const id = req.params.id
    const ura = { student_id: req.body.student_id, attendance_id: req.body.attendance_id }
    try {
        const connection = await connect
        const result = await connection.query(
            'update from user_register_attendance set ? where id = ?', [ura, id]
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
            'delete from user_register_attendance where id = ?', id
        )
        res.status(200).json({
            ok: true,
            result,
            msg: 'Deleted'
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

export const methods = { getAll, getOneByParameter, postOne, putOne, deleteOne }