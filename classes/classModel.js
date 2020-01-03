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
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  tasks: {
    type: [TaskSchema],
    default: [],
  },
  tests: {
    type: [TestSchema],
    default: [],
  },
}, {_id: false});

module.exports = {
  ClassScheme,
  Class: require('mongoose').model('class', ClassScheme),
  Test: TestSchema,
  Task: TaskSchema,
};
