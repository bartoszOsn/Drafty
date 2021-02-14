exports.isUsernameValid = function(username) {
    if(username.length < 3) {
        return {
            result: false,
            message: 'Username must have at least 3 characters.'
        };
    }
    return {
        result: true,
        message: `Username "${username}" is available.`
    };
}

exports.isPasswordValid = function(password) {
    if(password.length < 8) {
        return {
            result: false,
            message: `Password must have at least 8 characters.`
        };
    }
    if(!password.match(/[A-Z].*[A-Z]/)) {
        return {
            result: false,
            message: `Password must have at least 2 uppercase characters.`
        };
    }
    if(!password.match(/[0-9].*[0-9]/)) {
        return {
            result: false,
            message: `Password must have at least 2 digits.`
        };
    }
    return {
        result: true,
        message: `This password is secure!`
    };
};