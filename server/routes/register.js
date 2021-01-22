var express = require('express');
const url = require('url');
const UserDetails = require('./../models/userDetail');
const {isUsernameValid, isPasswordValid} = require('./../../shared/validation');
var router = express.Router();

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
        return res.render('account/register', { warning });
    }

    UserDetails.register({
        username,
        email
    }, password);

    return res.redirect('/');
});

module.exports = router;