// Add user schema with mongoose here
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    validate: {
      isAsync: true,
      validator: (v, cb) => {
        cb(validator.isEmail(v));
      },
      message: 'Please supply a valid email'
    },
    required: 'Please supply an email'
  },
  name: {
    type: String,
    trim: true,
    required: 'Please supply a name'
  },
  favorites: {
    hotels: [String],
    restaurants: [String],
    entertainment: [String],
    destinations: [{ type: Schema.Types.ObjectId, ref: 'Destination' }]
  }
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
