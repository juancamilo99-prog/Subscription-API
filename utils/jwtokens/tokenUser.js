const JWT_TOKEN = require('jsonwebtoken');

const generateToken = (id, email) => {

    return JWT_TOKEN.sign(
        {id,email}, //la informacion que se incluida en el payload
        process.env.JWT_SECRET, // la clave secreta
        {expiresIn: "1d"} //duracion del token
    )
};

//verificamos si un token es valido

const verifyToken = (token) => {
    return JWT_TOKEN.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken }