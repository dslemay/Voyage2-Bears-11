const mongoose = require('mongoose');
const User = mongoose.model('User');
const yelp = require('yelp-fusion');
const keys = require('../config/keys');

const clientId = keys.yelpClientID;
const clientSecret = keys.yelpClientSecret;

exports.updateFavorites = async (req, res) => {
  // Check if place ID exists in current user array. If it doesn't $addToSet. If it does, remove from array
  const type = req.params.type;
  const userLocationArr = 'favorites.' + req.params.type; // Which array we are querying
  const locationQuery = req.body.locationId; // Location to be adding or removing
  const favorites = req.user.favorites[type];
  const operator = favorites.includes(locationQuery) ? '$pull' : '$addToSet';
  const favIndex = favorites.indexOf(locationQuery);
  const index = favIndex > -1 ? favIndex : undefined;

  await User.findByIdAndUpdate(
    req.user._id,
    {
      [operator]: { [userLocationArr]: locationQuery }
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

  // If there is no req.query, pull information from all of favorites
  const hotelsIds = req.user.favorites.hotels;
  const POIsIds = req.user.favorites.POIs;
  const hotelsPromise = hotelsIds.map(hotel => client.business(hotel));
  const POIsPromise = POIsIds.map(POI => client.business(POI));

  const hotelsRes = await Promise.all(hotelsPromise);
  const hotels = await hotelsRes.map(hotel => hotel.jsonBody);
  const POIsRes = await Promise.all(POIsPromise);
  const POIs = await POIsRes.map(POI => POI.jsonBody);
  res.send({ hotels, POIs });
};
