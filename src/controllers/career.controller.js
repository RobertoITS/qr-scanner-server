import { request, response } from 'express'
import { connect } from '../database/database'

const postOne = async (req = request, res = response) => {
    const { career_name, description, duration } = req.body
    const career = {
        career_name: career_name,
        description: description,
        duration: duration
    }
    try {
        const connection = await connect
        const result = await connection.query('INSERT INTO career SET ?', career)
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
        const result = await connection.query('SELECT * FROM career WHERE id = ?', id)
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
    //! Esta consulta busca un parametro en todas las columnas
    //* Los signos % son comodines para las busquedas avanzadas
    const parameter = `%${req.params.parameter}%`
    try {
        const connection = await connect
        const result = await connection.query(
            //`SELECT * FROM career WHERE name LIKE '${parameter}' OR description LIKE '${parameter}' OR duration LIKE '${parameter}'`
            'select * from career where concat(career_name, description, duration) like ?', parameter
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

const getAll = async (req = request, res = response) => {
    try {
        const connection = await connect
        const result = await connection.query('SELECT * FROM career')
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
    const career = {
        career_name: req.body.career_name,
        description: req.body.description,
        duration: req.body.duration
    }
    try {
        const connection = await connect
        const result = await connection.query('UPDATE career SET ? WHERE id = ?', [career, id])
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
        const result = await connection.query('DELETE FROM career WHERE id = ?', id)
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

export const methods = { postOne, getAll, getOne,putOne, deleteOne, getOneByParameters }