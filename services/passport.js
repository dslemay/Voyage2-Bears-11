// Create the strategy for passport authentication

const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('User');

// Method exposed under Passport-local-mongoose. Runs default Passport config
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
