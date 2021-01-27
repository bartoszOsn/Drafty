const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Schema for storing screenplay content.
 */
const screenplayDataSchema = new Schema({
    content: [{
        type: {type: String},
        text: {type: String}
    }]
});

const ScreenplayData = mongoose.model('screenplayContent', screenplayDataSchema);

module.exports = ScreenplayData;