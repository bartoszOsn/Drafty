const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Schema for storing screenplay content.
 */
const screenplayDataSchema = new Schema({
    content: [{
        blockType: String,
        blockText: String
    }]
});

const ScreenplayData = mongoose.model('screenplayContent', screenplayDataSchema, 'screenplayContent');

module.exports = ScreenplayData;