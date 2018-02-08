const passport = require('passport');
const mysqlDB = require('../database/index.js');
const GitHubStrategy = require('passport-github').Strategy;

let config;
let options;

if (process.env.NODE_ENV === 'production') {
  options = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'https://codeop28.herokuapp.com/auth/github/return',
    passReqToCallback: true
  };
} else {
  config = require('../config/configvars.js');
  options = {
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/github/return',
    passReqToCallback: true
  };
}

passport.use(new GitHubStrategy(options, (req, accessToken, refreshToken, profile, done) => {
  const userProfile = {
    displayName: profile.displayName,
    gitLogin: profile.username,
    avatarUrl: profile.photos[0].value,
    session_id: req.sessionID,
    user_bio: profile._json.bio

  };
console.log('profile', profile._json.bio);
  mysqlDB.userLogin(userProfile, (err, user) => {
    if (err) {
      return done(err, null);
    }
    return done(null, profile);
  });
}
));

// used to serialize the user for the session
passport.serializeUser((user, done) => {
  done(null, user);
});
// used to deserialize the user
passport.deserializeUser((userId, done) => {
  done(null, userId);
});
