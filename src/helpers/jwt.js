const jwt = require('jsonwebtoken')

//! Token generator
const generateJWT = (uid) => {
    return new Promise((resolve, rejected) => {
        const payload = { uid }
        //TODO: expiresIn => Check if it's necessary for this project
        jwt.sign(payload, process.env.JWT_SECRET, /*{ expiresIn: '12h' },*/ (err, token) => {
            if(err){
                console.log(err);
                rejected
            }
            else {
                resolve(token)
            }
        })
    })
}

export default generateJWT