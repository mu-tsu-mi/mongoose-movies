const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

// what does 'cb' do..? I don't see any definition..
passport.use(new GoogleStrategy(
    // Configuration object
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
    },

    // The verify (by profile on Google) callback function
    async function(accessToken, refreshToken, profile, cb) {
      // A user has logged in with OAuth...
      
      try{
        let user = await User.findOne({googleId: profile.id})
         // Existing user found, so provide it to passport
        if(user) return cb(null, user);
        // We have a new user via OAuth!
        user = await User.create({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
    })
    return cb(null, user)
    } catch(err) {
        return cb(err)
    }
    }
  ));

//After the verify callback function returns the user document, 
// passport calls the passport.serializeUser() method's callback 
// passing that same user document as an argument.
  passport.serializeUser(function(user, cb) {
    cb(null, user._id);
  });

//is called every time a request comes in from an existing logged in user.   
// Add to bottom of config/passport.js
passport.deserializeUser(async function(userId, cb) {
    // It's nice to be able to use await in-line!
    cb(null, await User.findById(userId));
  });
  