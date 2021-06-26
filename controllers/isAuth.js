/* const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (token) => {

    jwt.verify(token, config.server.token, (error, authData) => {
        if (error) res.status(403).json({ msg: `Invalid access request`, code: 403 });
        res.status(200).json({ msg: `User is authorized`, code: 200, obj: authData }); 
    })
} */