const mongoose = require('mongoose');
const User = mongoose.Model('User');

exports.validateRegister = (req, res, next) => {
  // Sanitize name and check that it is not empty
  check('name', 'You must supply a name.')
    .exists()
    .trim();
  sanitizeBody('name');
  // Sanitize email, make sure it is valid, and normalize?
  check('email', 'You must supply an email')
    .isEmail()
    .trim();
  sanitizeBody('email').normalizeEmail();
  // Check that password is not empty.
  check('password', 'You must supply a password').exists();
  // Check that password confirm is not empty and is the same as password
  // check('password-confirm', 'You must confirm your password')
  //   .exists()
  //   .custom((value, { req }) => value === req.body.password);
  // Check for errors. Call next if no errors. If errors return and display errors.
  const errors = validationResult(req);
  if (errors) {
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
