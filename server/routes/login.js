var express = require('express');
var router = express.Router();

/* GET main page. */
router.get('/', function(req, res, next) {
  res.render('account/login');
});

module.exports = router;