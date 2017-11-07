const axios = require('axios');
const yelp = require('yelp-fusion');
const keys = require('../config/keys');

const clientId = keys.yelpClientID;
const clientSecret = keys.yelpClientSecret;
const googleFlights = keys.googleFlights;

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
          const twelveResults = response.jsonBody.businesses.slice(0, 12);
          const hotels = JSON.stringify(twelveResults, null, 4);
          res.send(hotels);
        });
      })
      .catch(e => {
        console.log(e);
      });
  });

  app.post('/api/flights', async (req, res) => {
    const url = `https://www.googleapis.com/qpxExpress/v1/trips/search?key=${googleFlights}`;
    const origin = req.body.origin;
    const destination = req.body.destination;
    const date = req.body.date;
    const data = {
      request: {
        slice: [
          {
            origin,
            destination,
            date
          }
        ],
        passengers: {
          adultCount: 1
        },
        solutions: 1
      }
    };
    try {
      const flights = await axios.post(url, data);
      res.send({ flights: flights.data });
    } catch (error) {
      console.log(error);
    }
  });
};
