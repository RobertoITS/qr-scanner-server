import { request, response } from 'express'
import { connect } from '../database/database'

const getAll = async (req = request, res = response) => {
    try {
        const connection = await connect
        const result = await connection.query(
            'select * from career_contains_materia'
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

}

const postOne = async (req = request, res = response) => {

}

const putOne = async (req = request, res = response) => {

}

const deleteOne = async (req = request, res = response) => {

}


export const methods = { getAll, getOneByParameters, postOne, putOne, deleteOne }