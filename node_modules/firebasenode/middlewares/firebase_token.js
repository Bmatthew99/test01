const {admin} = require('../core/firebase');

module.exports = {
    validateToken : (req, res, next) => {
        let idToken;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
            idToken = req.headers.authorization.split('Bearer ')[1];
        } else {
            return res.status(403).json({error: "Unauthorized."})
        }
        admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            req.user = decodedToken;
            return next();
        })
        .catch(error => {
            return res.status(403).send(error);
        })
    }
}