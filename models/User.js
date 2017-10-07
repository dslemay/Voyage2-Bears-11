// Add user schema with mongoose here
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please supply a valid email'],
    required: 'Please supply an email'
  },
  name: {
    type: String,
    trim: true,
    required: 'Please supply a name'
  }
});

userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
