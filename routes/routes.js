// Add logic for authorization routes here
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post(
  '/register',
  authController.validateRegister,
  authController.checkValidations,
  authController.register,
  authController.login
);

router.post('/login', authController.login);
router.get('/logout', (req, res) => {
  req.logout();
  console.log('Logout successful');
  res.redirect('/');
});

module.exports = router;
