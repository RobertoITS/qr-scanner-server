import { response, request } from 'express';
import { connect } from '../database/database';

const getAll = async (req = request, res = response) => {
    try {
        const connection = await connect
        const result = await connection.query(
            'SELECT * FROM inscriptions I ' +
            'JOIN materia M JOIN users U ' +
            'ON I.materia_id = M.id AND I.student_id = U.id'
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
    console.log(parameter);
    try {
        const connection = await connect
        const result = await connection.query(
            'SELECT * FROM inscriptions I ' +
            'INNER JOIN materia M ' +
            'INNER JOIN users U ' +
            'ON I.materia_id = M.id AND I.student_id = U.id ' +
            `WHERE U.name LIKE '${parameter}' OR ` +
            `U.last_name LIKE '${parameter}' OR ` +
            `U.cuil LIKE '${parameter}' ` +
            'ORDER BY I.id'
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
    const inscription = { student_id: req.body.student_id, materia_id: req.body.materia_id }
    try {
        const connection = await connect
        const result = await connection.query('INSERT INTO inscriptions SET ?', inscription)
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
    const inscription = { student_id: req.body.student_id, materia_id: req.body.materia_id }
    try {
        const connection = await connect
        const result = await connection.query('UPDATE inscriptions SET ? WHERE id = ?', [inscription, id])
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
        const result = await connection.query('DELETE FROM inscriptions WHERE id = ?', id)
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