// Add logic for authorization routes here
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post(
  '/auth/register',
  authController.validateRegister,
  authController.checkValidations,
  authController.register,
  authController.login
);

router.post('/auth/login', authController.login);
router.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
