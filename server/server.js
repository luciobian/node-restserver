const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();


const dev = process.env.NODE_ENV !== "production";

const dotenv = require('dotenv');

const env = (dev) ? dotenv.config({ path: __dirname + '/.env.development' }) :
    dotenv.config({ path: __dirname + '/.env' });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes/routes'));


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err;

    console.log("DB online");
});

app.listen(process.env.PORT, () => console.log("Escuchando puerto", process.env.PORT));