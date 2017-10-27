// post data for setting and unsetting favorites
// get data for pulling information out of database and storing in redux
const authController = require('../controllers/authController');
const favoritesController = require('../controllers/favoritesController');

module.exports = app => {
  app.post(
    '/api/favorites/:type',
    authController.isLoggedIn,
    favoritesController.updateFavorites
  );
  // Confirm user is authenticated
  // Call controller to update user model and store/remove ID
  // After completed will need to call a Redux action to update
};

/* Redux plans:
  Once the user model is updated return a response to the front end. Front end then uses
  contents of response to determine what actions to run.
  Action accepts a parameter for type (get, remove) and array modifying.
  If get, call axios

  Create two action types: Get location and Remove location.
  Get location: Call back end server to 

  Attach 
  /api/yelp/favorites/


*/
