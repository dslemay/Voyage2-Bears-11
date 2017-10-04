const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Import Environment variables to store information not in the repo.
require('dotenv').config();

// Connect to Database and use native ES6 promises
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DATABASE, {
    useMongoClient: true
  })
  .catch(err => console.error(`Unable to connect to MongoDB: ${err.message}`));

require('./routes/detailRoutes')(app);

// Determine port and start server.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is running...');
});
