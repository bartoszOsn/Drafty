var express = require('express');
const url = require('url');
const passport = require('passport');
const UserDetails = require('./../models/userDetail');
const {isUsernameValid, isPasswordValid} = require('./../../shared/validation');
var router = express.Router();

/* GET register page. */
router.get('/', function(req, res, next) {
    if(req.user) {
        return res.render('account/info', {
            msgHeader: "You are logged in",
            message: "you can't create another account.",
            link: '/',
            linksText: "Go back to home page"
        });
    }
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

    let user = UserDetails.register({
        username,
        email
    }, password, (err, user) => {
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/");
        });
    });    
});

module.exports = router;