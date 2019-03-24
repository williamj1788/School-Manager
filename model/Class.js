const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;

const Task = require('./Task');
const Test = require('./Test');

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
        type: [Test],
        default: [],
    },
    Tests: {
        type: [Task],
        default: [],
    },
    user_id: {
        type: ObjectId,
        required: true,
    }
});

module.exports = Class = mongoose.model('class', ClassScheme);