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
  },
});

const TaskSchema = new Scheme({
  name: {
    required: true,
    type: String,
  },
  due: {
    required: true,
    type: Date,
  },
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

module.exports = Class = require('mongoose').model('class', ClassScheme);
