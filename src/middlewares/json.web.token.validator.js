import { request, response } from 'express'

const jwt = require('jsonwebtoken')

//! This middleware function is used before the endpoints to validate that the token exists.
//* post("/", validateJWT) => validate the token before enters to the page
const validateJwt = (req = request, res = response, next) => {
    const token = req.headers.authorization //! Token from header
    console.log(token);
    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Missing token'
        })
    }

    try {
        //* We verify the token obtained with the secret key:
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        req.id = id
        console.log('Access granted');
        next() //* Continue
    }
    catch (e) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        })
    }
}

export const jwtValidator = {
    validateJwt
}