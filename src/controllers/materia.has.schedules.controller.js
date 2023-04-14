import { connect } from "../database/database";
import { response, request } from 'express'

const getAll = async (req = request, res = response) => {
    try {
        const connection = await connect
        const result = await connection.query(
            'select * from materia_has_schedules MS ' + 
            'inner join materia M inner join schedules S inner join users U ' + 
            'on MS.materia_id = M.id and MS.schedule_id = S.id and M.professor_id = U.id'
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

const getOneByParameters = async (req = request, res = response) => {
    const parameter = `%${req.body.parameter}%`
    try {
        const connection = await connect
        const result = await connection.query( //? --------------> Search professor, career, schedule day
            'select * from materia_has_schedules MS ' +
            'inner join materia M inner join schedules S inner join users U inner join career C ' +
            'on MS.materia_id = M.id and MS.schedule_id = S.id and U.id = M.professor_id ' +
            'where concat(M.materia_name, S.class_day, U.name, U.last_name, U.cuil, C.career_name, S.class_day, S.class_schedule) like ?', parameter
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

const postOne = async (req = request, res = response) => {
    const ms = { materia_id: req.body.materia_id, schedule_id: req.body.schedule_id }
    try {
        const connection = await connect
        const result = await connection.query('insert into materia_has_schedules set ?', ms)
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
    const ms = { materia_id: req.body.materia_id, schedule_id: req.body.schedule_id }
    try {
        const connection = await connect
        const result = await connection.query('update from materia_has_schedules set ? where id = ?', [ms, id])
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

const deleteOne = async (req = request, res = response) => {
    const id = req.params.id
    try {
        const connection = await connect
        const result = await connection.query(
            'delete from materia_has_schedules where id = ?', id
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