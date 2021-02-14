const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Schema for storing screenplay data.
 * It is stored as subdocuments in UserDetail documents.
 */
const screenplaySchema = new Schema({
    /**
     * ID of document containing screenplay data inside 'ScreenplayData' model
     */
    dataID: Schema.Types.ObjectId,
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