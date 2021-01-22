const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const screenplaySchema = require('./screenplay');

const Schema = mongoose.Schema;
const UserDetail = new Schema({
  username: String,
  email: String,
  password: String,
  screenplays: {
      type: [screenplaySchema],
      default: []
  }
});

UserDetail.plugin(passportLocalMongoose);
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

module.exports = UserDetails;
