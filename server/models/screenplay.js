const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const screenplaySchema = new Schema({
    filename: String,
    name: String
});

module.exports = screenplaySchema;