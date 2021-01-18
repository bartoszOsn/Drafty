exports.validate_login_post = function(req, res) {
    //TODO: implement this.
    res.json({
        success: true,
        message: `Username "${req.params.username}" is available.`
    });
}

exports.validate_password_post = function(req, res) {
    //TODO: implement this.
    res.json({
        success: true,
        message: `Password is secure.`
    });
}