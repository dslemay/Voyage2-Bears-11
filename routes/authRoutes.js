const express = require('express');
const authController = require('../controllers/authController');

module.exports = app => {
  app.post(
    '/auth/register',
    authController.validateRegister,
    authController.checkValidations,
    authController.register,
    authController.login
  );

  app.post('/auth/login', authController.login);

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
