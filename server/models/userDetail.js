const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const screenplaySchema = require('./screenplay');

const Schema = mongoose.Schema;

/**
 * Schema for storing user data in database.
 * It is used for authentication.
 */
const UserDetail = new Schema({
    username: String,
    email: String,
    password: String,
    screenplays: {
        type: [screenplaySchema],
        default: []
    },
    /**
     * Token used for changing password.
     * If user is not in the process of changing password, token is null.
     */
    token: {
        type: String,
        default: null
    },
    /**
     * Date where token will expire.
     * If user want's to change password after expiration, they must generate new token.
     */
    tokenExpiration: {
        type: Number,
        default: Date.now
    }
});

// Use this schema for authentication
UserDetail.plugin(passportLocalMongoose);

// Create and export model
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

module.exports = UserDetails;
