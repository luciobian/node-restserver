const jwt = require('jsonwebtoken');

let tokenVerification = (req, res, next) => {

    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEED, (err, data) => {
        if (err) {
            return res.status(401)
                .json({
                    success: false,
                    err
                });
        }

        req.usuario = data.data;
        next();
    });

};

let adminVerification = (req, res, next) => {

    let user = req.usuario;

    if (!(user.role == 'ADMIN_ROLE')) {
        return res.status(401)
            .json({
                success: false,
                message: 'No posee autorizacion'
            });
    }

    next();
};

module.exports = {
    tokenVerification,
    adminVerification
}