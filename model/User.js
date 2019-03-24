const mongoose = require('mongoose');
const Scheme = mongoose.Schema;
const Class = require('./Class');
const UserScheme = new Scheme({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    classes: {
        type: [Class],
        default: [],
    }
});

module.exports = User = require('mongoose').model('user', UserScheme);