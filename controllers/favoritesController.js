const mongoose = require('mongoose');
const User = mongoose.model('User');
const Destination = mongoose.model('Destination');
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
  const index = favorites.indexOf(locationQuery) > -1 ? favIndex : undefined;

  var user;
  if (index === undefined) {
    user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          [databaseArr]: {
            $each: [locationQuery],
            $position: 0
          }
        }
      },
      { new: true }
    );
  } else {
    user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { [databaseArr]: locationQuery }
      },
      { new: true }
    );
  }

  res.send({ index, user });
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

  function returnJsonBody(yelpArray) {
    return yelpArray.map(location => location.jsonBody);
  }

  // If there is no req.query, pull information from all of favorites
  const hotelsIds = req.user.favorites.hotels;
  const restaurantsIds = req.user.favorites.restaurants;
  const entertainmentIds = req.user.favorites.entertainment;
  const destinationIds = req.user.favorites.destinations;

  // Get any data stored in user model
  const destinationPromise = User.findOne(
    { _id: req.user._id },
    'favorites.destinations'
  ).populate('favorites.destinations', 'name slug image');

  // Resolve all promises and format data for return
  const hotelsPromise = yelpPromiseArray(hotelsIds);
  const restaurantsPromise = yelpPromiseArray(restaurantsIds);
  const entertainmentPromise = yelpPromiseArray(entertainmentIds);
  const [
    hotelsRes,
    restaurantsRes,
    entertainmentRes,
    destinationRes
  ] = await Promise.all([
    hotelsPromise,
    restaurantsPromise,
    entertainmentPromise,
    destinationPromise
  ]);
  const hotels = returnJsonBody(hotelsRes);
  const restaurants = returnJsonBody(restaurantsRes);
  const entertainment = returnJsonBody(entertainmentRes);
  const { destinations } = destinationRes.favorites;

  res.send({ hotels, restaurants, entertainment, destinations });
};

exports.destinationDetails = async (req, res) => {
  const locationQuery = req.query.destination;
  const destination = await Destination.findById(
    locationQuery,
    'name slug image'
  );
  res.send({ destination });
};
