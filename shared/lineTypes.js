/**
 * This file provides array of objects giving info about types of lines/paragraphs/blocks
 * that appear in screenplays.
 * Each object has following format:
 *  {
 *      "name" - name of line type.
 *      "text-transform" - if text should be uppercase then this value is "uppercase", otherwise it's empty string.
 *      "text-align" - "left"/"right"/"center"
 *      "icon" - font awesome class names.
 *      "margin" - array of margin values, in order: [top, right, bottom, left].
 *          Horizontal values are in inches, while vertical is a number of lines.
 *  }
 */


module.exports = [
    {
        "name": "Scene",
        "uppercase": true,
        "text-align": "left",
        "icon": "fas fa-image",
        "margin": [1, 0, 0, 0]
    },
    {
        "name": "Action",
        "uppercase": false,
        "text-align": "left",
        "icon": "fas fa-walking",
        "margin": [1, 0, 0, 0]
    },
    {
        "name": "Character Cue",
        "uppercase": true,
        "text-align": "left",
        "icon": "fas fa-user",
        "margin": [1, 0, 0, 2.8]
    },
    {
        "name": "Parenthetical",
        "uppercase": false,
        "text-align": "left",
        "icon": "fas fa-exclamation",
        "margin": [0, 1.9, 0, 2.1]
    },
    {
        "name": "Dialogue",
        "uppercase": false,
        "text-align": "left",
        "icon": "fas fa-comment",
        "margin": [0, 1.3, 0, 1.4]
    },
    {
        "name": "Transition",
        "uppercase": true,
        "text-align": "right",
        "icon": "fas fa-camera",
        "margin": [1, 0, 0, 4.5]
    },
]