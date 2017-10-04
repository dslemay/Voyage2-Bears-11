const axios = require('axios');
const keys = require('../config/keys');

module.exports = app => {
  app.get('api/yelp', (req, res) => {
    const lat = 37.8136;
    const lng = 144.9631;

    axios({
      method: 'post',
      url: 'https://api.yelp.com/oauth2/token',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      params: {
        grant_type: 'client_credentials',
        client_id: keys.yelpClientID,
        client_secret: keys.yelpClientSecret
      }
    })
      .then(token => {
        const yelpToken = token.data.access_token;
        return getHotels(null, lat, lng);
      })
      .then(results => {
        res.status(201).send(results);
      })
      .catch(err => {
        res.status(err.status).send(err);
      });
  });
  function getHotels(token, lat, lng) {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      console.log('Problem retrieving hotels...');
    }
    return axios({
      method: 'get',
      url: 'https://api.yelp.com/v3/businesses/search',
      params: {
        term: 'hotels',
        latitude: lat,
        longitude: lng
      }
    })
      .then(results => {
        return results.data;
      })
      .catch(err => {
        console.log('Error');
      });
  }
};
