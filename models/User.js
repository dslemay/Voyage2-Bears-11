// Add user schema with mongoose here
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
import isEmail from 'validator/lib/isEmail';
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const userScema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    validate: [isEmail, 'Please supply a valid email'],
    required: 'Please supply an email'
  },
  name: {
    type: String,
    trime: true,
    required: 'Please supply a name'
  }
});

userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
