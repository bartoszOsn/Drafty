var express = require('express');
const passport = require('passport');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('account/login');
});

router.post('/', function(req, res, next) {
  passport.authenticate('local', (err, user, info)=> {
    console.log(user);
    console.log(err);
    if(err) {
      next(err);
    }

    if(!user) {
      return res.redirect('/login');
    }
    req.logIn(user, function(err){
        if(err) {
            return next(err);
        }

        return res.redirect('/');
    })

  })(req, res, next);
});

module.exports = router;