import { request, response } from 'express'
import { connect } from '../database/database'

const getAll = async (req = request, res = response) => {
    try {
        const connection = await connect
        const result = await connection.query(
            'select CCM.id, CCM.career_id, CCM.materia_id, M.professor_id, C.career_name, C.duration, M.materia_name, M.actual_year, M.classes_quantity, (U.name) as professor_name, U.last_name, U.cuil from career_contains_materia CCM ' + 
            'inner join career C inner join materia M inner join users U ' +
            'on CCM.materia_id = M.id and CCM.career_id = C.id and M.professor_id = U.id'
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
            'select CCM.id, CCM.career_id, CCM.materia_id, M.professor_id, C.career_name, C.duration, M.materia_name, M.actual_year, M.classes_quantity, (U.name) as professor_name, U.last_name, U.cuil from career_contains_materia CCM ' +
            'inner join career C inner join materia M inner join users U ' +
            'on CCM.materia_id = M.id and CCM.career_id = C.id and M.professor_id = U.id ' +
            'where concat(C.career_name, M.materia_name, M.actual_year, U.last_name, U.name, U.cuil, U.user_name) like ?', parameter
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

const postOne = async (req = request, res = response) => {
    const ccm = { materia_id: req.body.materia_id, career_id: req.body.career_id }
    try {
        const connection = await connect
        const result = await connection.query(
            'insert into career_contains_materia set ?', ccm
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
    const ccm = { materia_id: req.body.materia_id, career_id: req.body.career_id }
    try {
        const connection = await connect
        const result = await connection.query(
            'update career_contains_materia set ? where id = ?', [ccm, id]
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

const deleteOne = async (req = request, res = response) => {
    const id = req.params.id
    try {
        const connection = await connect
        const result = await connection.query(
            'delete from career_contains_materia where id = ?', id
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


export const methods = { getAll, getOneByParameters, postOne, putOne, deleteOne }