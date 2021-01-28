/**
 * This file provides array of objects giving info about types of lines/paragraphs/blocks
 * that appear in screenplays.
 * Each object has following format:
 *  {
 *      "name" - name of line type.
 *      "text-transform" - if text should be uppercase then this value is "uppercase", otherwise it's empty string.
 *      "text-align" - "left"/"right"/"center"
 *      "margin" - array of margin values, in order: [top, right, bottom, left].
 *          Horizontal values are in inches, while vertical is a number of lines.
 *  }
 */


module.exports = [
    {
        "name": "Scene",
        "text-transform": "uppercase",
        "text-align": "left",
        "margin": [1, 0, 0, 0]
    },
    {
        "name": "Action",
        "text-transform": "",
        "text-align": "left",
        "margin": [1, 0, 0, 0]
    },
    {
        "name": "Character cue",
        "text-transform": "uppercase",
        "text-align": "left",
        "margin": [1, 0, 0, 2.8]
    },
    {
        "name": "Personal Direction",
        "text-transform": "",
        "text-align": "left",
        "margin": [1, 1.9, 0, 2.1]
    },
    {
        "name": "Dialogue",
        "text-transform": "",
        "text-align": "left",
        "margin": [1, 1.3, 0, 1.4]
    },
    {
        "name": "Transition",
        "text-transform": "uppercase",
        "text-align": "right",
        "margin": [1, 0, 0, 4.5]
    },
]