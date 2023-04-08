import { connect } from './../database/database'
import { request, response } from 'express'
import generateJWT from './../helpers/jwt'
import bcryptjs from 'bcryptjs'

const login = async(req = request, res = response) => {
    const { username, pass } = req.body //! Obtains the data from the body

    console.log(`username: ${username} pass: ${pass}`);

    try {
        const connection = await connect
        const result = await connection.query('SELECT * FROM users WHERE user_name = ?', username)
        console.log(result);
        if (result.length != 0) { //! If the user exist:
            const validPass = bcryptjs.compareSync(pass, result[0].pass) //! Compare the encrypted password

            if (!validPass) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Invalid password'
                })
            } else {
                //! For token generation, uses role, to compare later
                const token = await generateJWT(result[0].id) //! Generate the token for the session
                return res.status(200).json({
                    ok: true,
                    token,
                    result
                })
            }
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'Non-existent user'
            })
        }
    } catch (e) {
        return res.status(400).json({
            ok: false,
            msg: 'Something goes wrong'
        })
    }
}

export const methods = { login }