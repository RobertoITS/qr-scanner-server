import { request, response } from 'express'
import { connect } from '../database/database'
import bcryptjs from 'bcryptjs'

/**
 * C = Create
 * R = Read
 * U = Update
 * D = Delete
 */

//! PARA TENER EN CUENTA! LOS USUARIOS VAN A SER EL MISMO CUIL DE LA PERSONA!
const register = async (req = request, res = response) => {

    const { name, last_name, cuil, dir, email, phone, username, pass, role } = req.body
    
    let passwordHash = await bcryptjs.hash(pass, 8)

    const object = { name: name, last_name: last_name, cuil: cuil, dir: dir, email: email, phone: phone, username: username, pass: passwordHash, role: role }

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