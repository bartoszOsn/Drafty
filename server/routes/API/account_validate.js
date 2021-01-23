const {isUsernameValid, isPasswordValid} = require('./../../../shared/validation');

/**
 * route handler used for validation of login.
 */
function validate_login_post(req, res) {
    res.json(isUsernameValid(req.body.data));
}

/**
 * route handler used for validation of password.
 */
function validate_password_post(req, res) {
    res.json(isPasswordValid(req.body.data));
}

module.exports = function(router) {
    router.post('/validate_login', validate_login_post);
    router.post('/validate_password', validate_password_post);
}