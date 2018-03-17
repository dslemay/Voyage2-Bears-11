const express = require('express');
const assert = require('assert');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const expressValidator = require('express-validator');
const keys = require('./config/keys');
require('./models/User');
require('./models/Destination');
const passport = require('passport');
require('./services/passport');

const app = express();

const { database, cookieSecret } = keys;

// Connect to Database and use native ES6 promises
mongoose.Promise = global.Promise;
mongoose
  .connect(database)
  .catch(err => console.error(`Unable to connect to MongoDB: ${err.message}`));

// Set up middlewares

// Body Parser to be used for passing the fields for login and registration form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Validator will be used for registration form to validate and sanitize data
app.use(expressValidator());

// Set up and configure MongoDBStore for storing session details
const store = new MongoDBStore({
  uri: database,
  collection: 'sessions',
});

store.on('error', error => {
  assert.ifError(error);
  assert.ok(false);
});

// Set up sessions to allow for logins and Passport implementation.
app.use(
  session({
    secret: cookieSecret,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    resave: false,
    saveUninitialized: false,
    store,
  }),
);

// Initialize Passport and use sessions
app.use(passport.initialize());
app.use(passport.session());

// Set up the routes
require('./routes/authRoutes')(app);
require('./routes/detailRoutes')(app);
require('./routes/favoriteRoutes')(app);

// Serve up React files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Determine port and start server.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is running...');
});
