const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;

const ClassScheme = new Scheme({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: '#000000',
    },
    user_id: {
        type: ObjectId,
        required: true,
    }
});

module.exports = Class = mongoose.model('class', ClassScheme);