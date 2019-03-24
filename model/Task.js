const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    due: {
        required: true,
        type: Date,
    }
});

module.exports = Class = mongoose.model('task', TaskSchema);