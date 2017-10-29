const authController = require('../controllers/authController');
const favoritesController = require('../controllers/favoritesController');

module.exports = app => {
  app.post(
    '/api/favorites/:type',
    authController.isLoggedIn,
    favoritesController.updateFavorites
  );
};
