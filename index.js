const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const expressValidator = require('express-validator');
require('./models/User');
const routes = require('./routes/routes');
const passport = require('passport');
require('./services/passport');

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

// Set up middlewares

//Body Parser to be used for passing the fields for login and registration form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Validator will be used for registration form to validate and sanitize data
app.use(expressValidator());

// Set up and configure MongoDBStore for storing session details
const store = new MongoDBStore({
  uri: process.env.DATABASE,
  collection: 'sessions'
});

store.on('error', function(error) {
  assert.ifError(error);
  assert.ok(false);
});

// Set up sessions to allow for logins and Passport implementation.
app.use(
  require('express-session')({
    secret: process.env.SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

// Initialize Passport and use sessions
app.use(passport.initialize());
app.use(passport.session());

// Set up the routes
app.use('/', routes);
require('./routes/detailRoutes')(app);

// Determine port and start server.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is running...');
});
