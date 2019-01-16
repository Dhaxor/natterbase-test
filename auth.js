const jwt = require('jsonwebtoken');
const config = require('./config/config');
const Auth = {

    isAuthenticated: function (req, res, next) {
        let token;
        if (req.headers && req.headers.authorization) {
            const parts = req.headers.authorization.split(' ');

            if (parts.length === 2) {
                const scheme = parts[0],
                    credentials = parts[1];
                if (/^Bearer$/i.test(scheme)) {
                    token = credentials;
                }
            } else {
                return res.status(403).json({err: true, code: 403, message: "Format is Authorization: Bearer [token]", data: null});
            }
        } else {
            return res.status(404).json({err: true, code: 404, message: "No Authorization header was found", data: null});
        }

        jwt.verify(token, config.SECRET, function(err, decoded) {
            if(err){
                return res.status(401).json({err: true, code: 401, message: "Failed to authenticate token.", data: null});
            }else {
                req.decoded = decoded;
                next();
            }
        });

    },
};


module.exports = Auth;
