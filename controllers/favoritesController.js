const mongoose = require('mongoose');
const User = mongoose.model('User');
const yelp = require('yelp-fusion');
const keys = require('../config/keys');

const clientId = keys.yelpClientID;
const clientSecret = keys.yelpClientSecret;

exports.updateFavorites = async (req, res) => {
  // Check if place ID exists in current user array. If it doesn't $addToSet. If it does, remove from array
  const favArrName = req.body.favArrName; // Hotels vs POIs
  const databaseArr = 'favorites.' + favArrName; // Which array we are modifying in the database
  const locationQuery = req.body.locationId; // Location to be adding or removing
  const favorites = req.user.favorites[favArrName];
  const operator = favorites.includes(locationQuery) ? '$pull' : '$addToSet';
  const favIndex = favorites.indexOf(locationQuery);
  const index = favIndex > -1 ? favIndex : undefined;

  await User.findByIdAndUpdate(
    req.user._id,
    {
      [operator]: { [databaseArr]: locationQuery }
    },
    { new: true }
  );

  res.send({ index });
};

exports.getFavoritesData = async (req, res) => {
  const tokenReq = await yelp.accessToken(clientId, clientSecret);
  const token = tokenReq.jsonBody.access_token;
  const client = yelp.client(token);
  const locationQuery = req.query.location;

  // If there is a req.query, get information for that location
  if (locationQuery) {
    const locationRes = await client.business(locationQuery);
    const location = locationRes.jsonBody;
    return res.send(location);
  }

  function yelpPromiseArray(array) {
    return Promise.all(array.map(location => client.business(location)));
  }

  // If there is no req.query, pull information from all of favorites
  const hotelsIds = req.user.favorites.hotels;
  const POIsIds = req.user.favorites.POIs;
  const destinationIds = req.user.favorites.destinations;

  // Get any data stored in user model
  const destinationPromise = await User.findOne(
    { _id: req.user._id },
    'favorites.destinations'
  );

  // Resolve all promises and format data for return
  const hotelsPromise = yelpPromiseArray(hotelsIds);
  const POIsPromise = yelpPromiseArray(POIsIds);
  const [hotelsRes, POIsRes, destinationRes] = await Promise.all([
    hotelsPromise,
    POIsPromise,
    destinationPromise
  ]);
  const hotels = hotelsRes.map(hotel => hotel.jsonBody);
  const POIs = POIsRes.map(POI => POI.jsonBody);
  const { destinations } = destinationRes.favorites;

  res.send({ hotels, POIs, destinations });
};
