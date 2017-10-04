const yelp = require('yelp-fusion');
const keys = require('../config/keys');

const clientId = keys.yelpClientID;
const clientSecret = keys.yelpClientSecret;

const searchRequest = {
  term: 'Hotels',
  location: 'san francisco, ca'
};

// Implement async/await syntax for this route

module.exports = app => {
  app.get('/api/yelp', (req, res) => {
    yelp
      .accessToken(clientId, clientSecret)
      .then(response => {
        const client = yelp.client(response.jsonBody.access_token);

        client.search(searchRequest).then(response => {
          const fiveResults = response.jsonBody.businesses.slice(0, 5);
          const hotels = JSON.stringify(fiveResults, null, 4);
          res.send(hotels);
        });
      })
      .catch(e => {
        console.log(e);
      });
  });
};
