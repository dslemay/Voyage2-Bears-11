const mongoose = require('mongoose');
const User = mongoose.model('User');
const yelp = require('yelp-fusion');
const keys = require('../config/keys');

const clientId = keys.yelpClientID;
const clientSecret = keys.yelpClientSecret;

exports.updateFavorites = async (req, res, next) => {
  // Check if place ID exists in current user array. If it doesn't $addToSet. If it does, remove from array
  const userLocationArr = req.params.type; // Which array we are querying
  const locationQuery = req.body.locationId; // Location to be adding or removing
  const favorites = req.user[userLocationArr];
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
