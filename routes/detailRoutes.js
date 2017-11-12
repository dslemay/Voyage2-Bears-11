const axios = require('axios');
const yelp = require('yelp-fusion');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const Destination = mongoose.model('Destination');

const clientId = keys.yelpClientID;
const clientSecret = keys.yelpClientSecret;
const googleFlights = keys.googleFlights;

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
          const businesses = JSON.stringify(twelveResults, null, 4);
          res.send(businesses);
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
