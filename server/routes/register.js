var express = require('express');
const url = require('url');
const warningMiddleware = require('./../middleware/warning');
const {isUsernameValid, isPasswordValid} = require('./../../shared/validation');
var router = express.Router();

router.use(warningMiddleware);

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('account/register');
});

router.post('/', function(req, res, next) {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let confirmPassword = req.body.confirm;

    let usernameValid = isUsernameValid(username);
    let passwordValid = isPasswordValid(password);
    let warning = null;
    if(!usernameValid.result) {
        warning = usernameValid.message;
    }
    else if(!passwordValid.result) {
        warning = passwordValid.message;
    }
    else if(password != confirmPassword) {
        warning = 'You must type same password in the both fields: "password" and "confirm password"';
    }

    if(warning != null) {
        let address = `/register?warning=${encodeURIComponent(warning)}`;
        console.log(address);
        return res.redirect(address);
    }

    return res.redirect('/');
});

module.exports = router;