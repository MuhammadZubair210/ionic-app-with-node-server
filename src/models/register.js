const mongoose = require('mongoose');
const schema = mongoose.Schema;

const regschema = new schema({
    email: String,
    password: String
});


const register = mongoose.model('register', regschema);

module.exports = register;