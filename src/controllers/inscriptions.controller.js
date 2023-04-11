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

export const methods = { getAll }