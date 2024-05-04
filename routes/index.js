var express = require('express');
var router = express.Router();
const passport = require('passport')

// This app has no "home" page, but your projects should 😀
router.get('/', function(req, res, next) {
  res.redirect('/movies');
});

// Google OAuth "LOGIN" route
// The passport.authenticate() method will return a middleware function 
// that does the coordinating with Google's OAuth server.
// The user will be presented the consent screen if they haven't previously consented
router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    // prompt: "select_account"
  }
));

// Google "OAuth callback" route, that Google will call after the user confirms
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/movies',
    failureRedirect: '/movies'
  }
));

// OAuth "LOGOUT" route
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/movies');
  });
});


module.exports = router;
