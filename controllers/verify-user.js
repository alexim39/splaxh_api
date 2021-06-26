//const jwt = require('jsonwebtoken');
//const config = require('../config/config');


module.exports = (req, res, next) => {
    // get the auth heade value
    const bearerHeader = req.headers['authorization'];
    
    try {
        //check if bearer is undedfined
        if (typeof bearerHeader !== 'undefined') {
            // split at the space
            const bearer = bearerHeader.split(' ');
            // get token from array
            const bearerToken = bearer[1];
            // set the token
            req.token = bearerToken;
            /* jwt.verify(req.token, config.server.token, (error, payload) => {
                if (error) res.status(403).json({ msg: `Invalid access request`, code: 403 });
                req.payload;
            }) */

            /* const payload = jwt.verify(req.token, config.server.token);
            if (!payload) res.status(401).json({ msg: `Unauthorized access`, code: 401 });
            req.user = payload.user; */

            // call next mw
            next();
        } else {
            res.status(401).json({ msg: `Unauthorized access`, code: 401 });
        }
    } catch (error) {
        return res.status(500).json({ msg: `Invalid token`, code: 500 });
    }
    
}