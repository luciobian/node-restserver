const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/login', (req, res) => {

    let body = req.body;

    const errorResponse = (statusCode, err, message = null) => res.status(statusCode)
        .json({
            success: false,
            message,
            err
        });

    Usuario.findOne({ email: body.email }, (err, data) => {
        if (err) {
            return errorResponse(500, err);
        };

        if (!data) {
            return errorResponse(400, err, message = "Usuario o contrasenia incorrecto. PASSWORD0");
        };


        if (!bcrypt.compareSync(body.password, data.password)) {
            return errorResponse(400, err, message = "Usuario o contrasenia incorrecto. PASSWORD");
        };

        let token = jwt.sign({ data },
            process.env.SEED, { expiresIn: Number(process.env.TOKEN_EXP) },
        );

        res.json({
            success: true,
            usuario: data,
            token
        });
    });

});


module.exports = app;