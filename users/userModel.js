const {Schema} = require('mongoose');
const {ClassScheme} = require('../classes/classModel');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  classes: {
    type: [ClassScheme],
    default: [],
  },
});


module.exports = User = require('mongoose').model('user', UserSchema);
