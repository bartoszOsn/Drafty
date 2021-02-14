var express = require('express');
const passport = require('passport');
var router = express.Router();

/**
 * Logs user out.
 */
router.get('/', function(req, res, next) {
    req.logOut();
    return res.redirect('/');
});

module.exports = router;