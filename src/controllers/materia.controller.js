import { response, request } from 'express'
import { connect } from '../database/database'

/**
 * C = Create
 * R = Read
 * U = Update
 * D = Delete
 */

const postOne = async (req = request, res = response) => {
    const { name, professor_id, actual_year, classes_quantity, career_id } = req.body
    const materia = { name: name, professor_id: professor_id, actual_year: actual_year, classes_quantity: classes_quantity, career_id: career_id }
    try {
        const connection = await connect
        const result = await connection.query('INSERT INTO materia SET ?', materia)
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
            msg: 'Error'
        })
    }
}

const getAll = async (req = request, res = response) => {
    try {
        const connection = await connect
        const result = await connection.query('SELECT * FROM materia')
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

const getOne = async (req = request, res = response) => {
    const id = req.params.id
    try {
        const connection = await connect
        const result = await connection.query('SELECT * FROM materia WHERE id = ?', id)
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

const putOne = async (req = request, res = response) => {
    const id = req.params.id
    const materia = {
        name: req.body.name,
        professor_id: req.body.professor_id,
        actual_year: req.body.actual_year,
        classes_quantity: req.body.classes_quantity,
        career_id: req.body.career_id
    }

    try {
        const connection = await connect
        const result = await connection.query('UPDATE materia SET ? WHERE id = ?', [materia, id])
        res.status(200).json({
            ok: true,
            result,
            msg: 'Edited'
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
        const result = await connection.query('DELETE FROM materia WHERE id = ?', id)
        if(result.affectedRows != 0) {
            res.status(200).json({
                ok: true,
                result,
                msg: 'Deleted'
            })
        }
        else {
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

export const methods = { postOne, getAll, getOne, putOne, deleteOne }