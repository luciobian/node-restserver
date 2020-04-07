const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017'
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes/usuario'));


mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err;

    console.log("DB online");
});

app.listen(process.env.PORT, () => console.log("Escuchando puerto", process.env.PORT || 3000));