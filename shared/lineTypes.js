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
        "text-transform": "uppercase",
        "text-align": "left",
        "icon": "fas fa-image",
        "margin": [1, 0, 0, 0]
    },
    {
        "name": "Action",
        "text-transform": "",
        "text-align": "left",
        "icon": "fas fa-walking",
        "margin": [1, 0, 0, 0]
    },
    {
        "name": "Character Cue",
        "text-transform": "uppercase",
        "text-align": "left",
        "icon": "fas fa-user",
        "margin": [1, 0, 0, 2.8]
    },
    {
        "name": "Parenthetical",
        "text-transform": "",
        "text-align": "left",
        "icon": "fas fa-exclamation",
        "margin": [1, 1.9, 0, 2.1]
    },
    {
        "name": "Dialogue",
        "text-transform": "",
        "text-align": "left",
        "icon": "fas fa-comment",
        "margin": [1, 1.3, 0, 1.4]
    },
    {
        "name": "Transition",
        "text-transform": "uppercase",
        "text-align": "right",
        "icon": "fas fa-camera",
        "margin": [1, 0, 0, 4.5]
    },
]