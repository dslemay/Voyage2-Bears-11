const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const passport = require('passport');
const mongoose = require('mongoose');
const { promisify } = require('es6-promisify');

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
    .isEmpty(),
  // Check that the password confirm field is not empty and the passwords match
  check('password-confirm')
    .not()
    .isEmpty()
    .withMessage('You must confirm your password')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Your passwords must match'),
];

// eslint-disable-next-line consistent-return
exports.checkValidations = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }
  next();
};

exports.register = async (req, res, next) => {
  // Save User to database and hash password
  const user = new User({ name: req.body.name, email: req.body.email });
  const register = promisify(User.register.bind(User));
  await register(user, req.body.password);
  // TODO Add error handling for issues such as account already exists
  next();
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(401)
        .json({ type: 'error', text: info.message, redirect: '/login' });
    }
    return req.logIn(user, async error => {
      if (error) {
        return next(err);
      }
      await req.session.save();
      return res.status(200).json({
        type: 'success',
        text: 'You have been successfully logged in',
        redirect: '/',
      });
    });
  })(req, res, next);
};

// eslint-disable-next-line consistent-return
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send({ error: 'You must be logged in!' });
};
