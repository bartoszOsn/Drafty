exports.isUsernameValid = function(username) {
    return {
        result: true,
        message: `Username "${username}" is available.`
    };
}

exports.isPasswordValid = function(password) {
    if(password.length < 6) {
        return {
            result: false,
            message: `Password must have at least 6 characters.`
        };
    }
    return {
        result: true,
        message: `This password is strong!`
    };
};