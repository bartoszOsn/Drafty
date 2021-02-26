var express = require('express');
const passport = require('passport');
var router = express.Router();

/**
 * Renders page for login.
 * If user is already logged in, then it renders info about it and link to home page
 */
router.get('/', function(req, res) {
    if(req.user) {
        return res.render('account/info', {
            msgHeader: "You are already logged in",
            message: "If you want to log in as another user, log out first.",
            link: '/',
            linksText: "Go back to home page"
        });
    }
    return res.render('account/login');
});

/**
 * Handles user logging in.
 */
router.post('/', function(req, res, next) {
  passport.authenticate('local', (err, user)=> {
    if(err) {
      next(err);
    }

    if(!user) {
      return res.render('account/login', {warning: 'Wrong username or password.'});
    }
    req.logIn(user, function(err){
        if(err) {
            return next(err);
        }

        return res.redirect('/screenplay/view');
    })

  })(req, res, next);
});

module.exports = router;