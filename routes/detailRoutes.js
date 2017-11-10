const yelp = require('yelp-fusion');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const Destination = mongoose.model('Destination');

const clientId = keys.yelpClientID;
const clientSecret = keys.yelpClientSecret;

// Implement async/await syntax for this route

module.exports = app => {
  app.get('/api/yelp', (req, res) => {
    const { location, category } = req.query;
    const searchRequest = {
      term: category,
      location
    };

    yelp
      .accessToken(clientId, clientSecret)
      .then(response => {
        const client = yelp.client(response.jsonBody.access_token);

        client.search(searchRequest).then(response => {
          const twelveResults = response.jsonBody.businesses.slice(0, 12);
          const hotels = JSON.stringify(twelveResults, null, 4);
          res.send(hotels);
        });
      })
      .catch(e => {
        console.log(e);
      });
  });

  app.get('/api/randomLocation', async (req, res) => {
    const location = await Destination.randomLocation();
    res.send(location[0].slug);
  });

  app.get('/api/locationDetails', async (req, res) => {
    const { location } = req.query;
    const locationData = await Destination.findOne({ slug: location });
    res.send(locationData);
  });
};
