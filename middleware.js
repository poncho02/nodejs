const jwt  = require('jsonwebtoken');

exports.userValidationToken = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send({message:"Unauthorized Account"});
            } else {
                req.jwt = jwt.verify(authorization[1], "secret_token");
                return next();
            }
        } catch (err) {
            return res.status(403).send({message:"user without permissions"});
        }
    } else {
        return res.status(401).send({message:"Unauthorized Account"});
    }
}
