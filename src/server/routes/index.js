var express = require('express');
var router = express.Router();

/**
 * Renders home page.
 */
router.get('/', function(req, res, next) {
  res.render('index', {isLoggedIn: !!req.user, user: req.user? req.user.username : null});
});

module.exports = router;