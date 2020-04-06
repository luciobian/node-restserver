const express = require('express');
const bcrypt = require('bcryptjs');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();

app.get('/usuarios', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Usuario.find({}, 'name email role estado google')
        .skip(desde)
        .limit(limite)
        .exec((err, data) => {
            if (err) {
                return res.status(400)
                    .json({
                        success: false,
                        err
                    });
            };

            Usuario.count({}, (err, count) => {
                res.json({
                    success: true,
                    data,
                    count
                });
            });

        });
});
app.post('/usuarios', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((err, data) => {
        if (err) {
            return res.status(400)
                .json({
                    success: false,
                    err
                });
        }
        res.json({
            success: true,
            data
        })

    });


});
app.put('/usuarios/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
        if (err) {
            return res.status(400)
                .json({
                    success: false,
                    err
                });
        }
        res.json({
            success: true,
            data
        });
    });
});
app.delete('/usuarios', function(req, res) {
    res.json('DELETE');
});

module.exports = app;