const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.validateRegister = [
  // Check that the name is not empty and sanitize the data
  check('name', 'You must supply a name.')
    .not()
    .isEmpty()
    .trim(),
  sanitizeBody('name').escape(),
  // Check that the email is valid and normalize
  check('email', 'You must supply an email')
    .isEmail()
    .trim(),
  sanitizeBody('email').normalizeEmail(),
  // Check that the password is not empty
  check('password', 'You must supply a password')
    .not()
    .isEmpty()
  // Check that the password confirm field is not empty and the passwords match
  // TODO: Uncomment this logic when the password-confirm is added to the front-end
  // check('password-confirm')
  //   .not()
  //   .isEmpty()
  //   .withMessage('You must confirm your password')
  //   .custom((value, { req }) => value === req.body.password)
  //   .withMessage('Your passwords must match')
];

exports.checkValidations = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.mapped() });
  }
  next();
};

exports.register = (req, res, next) => {
  // Save User to database and hash password
  // Call next to allow login
};

exports.login = passport.authenticate('local', {
  successRedirect: '/',
  successFlash: 'You have successfully logged in',
  failureRedirect: '/login'
});
