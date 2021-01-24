const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Schema for storing screenplay data.
 * It is stored as subdocuments in UserDetail documents.
 */
const screenplaySchema = new Schema({
    /**
     * Name of the JSON file stored on the server with data about screenplay
     */
    filename: String,
    /**
     * Name of screenplay.
     */
    name: String,
    /**
     * Date of creation.
     */
    creationDate: {
        type: Date,
        default: ()=> new Date()
    }
});

module.exports = screenplaySchema;