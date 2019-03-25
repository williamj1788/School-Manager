const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const TestSchema = new Scheme({
    name: {
        required: true,
        type: String,
    },
    due: {
        required: true,
        type: Date,
    }
});

const TaskSchema = new Scheme({
    name: {
        required: true,
        type: String,
    },
    due: {
        required: true,
        type: Date,
    }
});

const ClassScheme = new Scheme({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: '#000000',
    },
    Tasks: {
        type: [TaskSchema],
        default: [],
    },
    Tests: {
        type: [TestSchema],
        default: [],
    },
});


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
        type: [ClassScheme],
        default: [],
    }
});



module.exports = User = require('mongoose').model('user', UserScheme);