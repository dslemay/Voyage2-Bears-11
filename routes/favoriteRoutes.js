const authController = require('../controllers/authController');
const favoritesController = require('../controllers/favoritesController');

module.exports = app => {
  app.post(
    '/api/favorites',
    authController.isLoggedIn,
    favoritesController.updateFavorites,
  );

  app.get(
    '/api/favorites',
    authController.isLoggedIn,
    favoritesController.getFavoritesData,
  );

  app.get(
    '/api/destinationDetails',
    authController.isLoggedIn,
    favoritesController.destinationDetails,
  );
};
