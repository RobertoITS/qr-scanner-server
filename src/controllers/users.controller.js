import { request, response } from 'express'
import { connect } from '../database/database'
import bcryptjs from 'bcryptjs'

/**
 * C = Create
 * R = Read
 * U = Update
 * D = Delete
 */

const register = async (req = request, res = response) => {

    const { user, name, last_name, rol, password } = req.body
    
    let passwordHash = await bcryptjs.hash(password, 8)

    const object = { user: user, name: name, last_name: last_name, rol: rol, password: passwordHash }

    try {

        const connection = await connect

        const result = await connection.query('INSERT INTO users SET ?', object)

        res.status(201).json({
            ok: true,
            object,
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


export const methods = { register }