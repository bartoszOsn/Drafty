const {isUsernameValid, isPasswordValid} = require('./../../validation');

exports.validate_login_post = function(req, res) {
    res.json(isUsernameValid(req.body.data));
}

exports.validate_password_post = function(req, res) {
    res.json(isPasswordValid(req.body.data));
}