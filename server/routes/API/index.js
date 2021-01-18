var express = require('express');
var router = express.Router();

const { validate_login_post, validate_password_post} = require('./account_validate');

/* GET main page. */
router.post('/validate_login', validate_login_post);
router.post('/validate_password', validate_password_post);

module.exports = router;