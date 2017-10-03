const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const routes = require('./routes/authRoutes');

const app = express();

// Import Environment variables to store information not in the repo.
require('dotenv').config({ path: 'variables.env' });

// Connect to Database and use native ES6 promises
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DATABASE, {
    useMongoClient: true
  })
  .catch(err => console.error(`Unable to connect to MongoDB: ${err.message}`));

// Set up middlewares

//Body Parser to be used for passing the fields for login and registration form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Validator will be used for registration form to validate and sanitize data
app.use(expressValidator());

app.use('/', routes);

// Determine port and start server.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is running...');
});
