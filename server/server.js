require('../config/config');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/usuarios', function(req, res) {
    res.json('GET');
});
app.post('/usuarios', function(req, res) {

    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400)
            .json({
                success: false,
                message: "Debe ingresar el nombre.",
            });
    } else {
        res.json({ persona: body });
    }


});
app.put('/usuarios/:id', function(req, res) {
    let id = req.params.id;
    res.json({
        id
    });
});
app.delete('/usuarios', function(req, res) {
    res.json('DELETE');
});

app.listen(process.env.PORT, () => console.log("Escuchando puerto", process.env.PORT));