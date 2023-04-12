import { request, response } from 'express'
import { connect } from '../database/database'

const postOne = async (req = request, res = response) => {
    const { id, class_day, class_schedule } = req.body
    const schedule = {
        id: id,
        class_day: class_day,
        class_schedule: class_schedule
    }
    try {
        const connection = await connect
        const result = await connection.query('INSERT INTO schedules SET ?', schedule)
        res.status(201).json({
            ok:true,
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

const getOne = async (req = request, res = response) => {
    const id = req.params.id
    try {
        const connection = await connect
        const result = await connection.query('SELECT * FROM schedules WHERE id = ?', id)
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

const getAll = async (req = request, res = response) => {
    try {
        const connection = await connect
        const result = await connection.query('SELECT * FROM schedules')
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
    const schedule = {
        class_day: req.body.class_day,
        class_schedule: req.body.class_schedule
    }
    try {
        const connection = await connect
        const result = await connection.query('UPDATE schedules SET ? WHERE id = ?', [schedule, id])
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
        const result = await connection.query('DELETE FROM schedules WHERE id = ?', id)
        if(result.affectedRows != 0){
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

const getOneByParameter = async (req = request, res = response) => {
    const parameter = `%${req.params.parameter}%`
    console.log(parameter);
    try {
        const connection = await connect
        const result = await connection.query(`SELECT * FROM schedules WHERE class_day LIKE '${parameter}' OR class_schedule LIKE '${parameter}'`)
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

export const methods = { postOne, getAll, getOne,putOne, deleteOne, getOneByParameter }