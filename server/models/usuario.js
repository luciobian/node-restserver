const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let validRoles = ({
    values: ['USER_ROLE', 'ADMIN_ROLE'],
    message: '{VALUE} no es un rol valido.'
})

const usuarioSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario.']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es necesario.']
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        required: true,
        enum: validRoles
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        required: false
    }
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;

};
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico.' });


module.exports = mongoose.model('Usuario', usuarioSchema);