import { request, response } from 'express'
import { connect } from '../database/database'

const postOne = async (req = request, res = response) => {
    const { name, description, duration } = req.body
    const career = {
        name: name,
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
        name: req.body.name,
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

export const methods = { postOne, getAll, getOne,putOne, deleteOne }