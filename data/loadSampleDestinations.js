const keys = require('../config/keys');
const fs = require('fs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const { database } = keys;

mongoose.connect(database);
require('../models/Destination');

const Destination = mongoose.model('Destination');

const destinations = JSON.parse(
  fs.readFileSync(`${__dirname}/destinationInformation.json`, 'utf-8'),
);

async function loadData() {
  try {
    await Destination.insertMany(destinations);
    console.log('Done!');
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit();
  }
}

loadData();
