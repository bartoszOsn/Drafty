/**
 * This file provides array of objects giving info about types of lines/paragraphs/blocks
 * that appear in screenplays.
 * Each object has following format:
 *  {
 *      "name" - name of line type.
 *      "upparcase" - if true, text should be uppercase.
 *      "text-align" - "left"/"right"/"center"
 *      "icon" - font awesome class names.
 *      "margin" - array of margin values, in order: [top, right, bottom, left].
 *          Horizontal values are in inches, while vertical is a number of lines.
 *      "next-paragraph" - name of the paragraph, that will be created by pressing enter inside this one.
 *      "tab-transform" - in what type you will transform this one, if you will push tab key.
 *      "tab-shift-transform" - in what type you will transform this one, if you will push tab+shift keys.
 *  }
 */


module.exports = [
    {
        "name": "Scene",
        "uppercase": true,
        "text-align": "left",
        "icon": "fas fa-image",
        "margin": [1, 0, 0, 0],
        "next-paragraph": "Action",
        "tab-transform": "Action",
        "tab-shift-transform": "Scene"
    },
    {
        "name": "Action",
        "uppercase": false,
        "text-align": "left",
        "icon": "fas fa-walking",
        "margin": [1, 0, 0, 0],
        "next-paragraph": "Action",
        "tab-transform": "Character Cue",
        "tab-shift-transform": "Scene"
    },
    {
        "name": "Character Cue",
        "uppercase": true,
        "text-align": "left",
        "icon": "fas fa-user",
        "margin": [1, 0, 0, 2.8],
        "next-paragraph": "Dialogue",
        "tab-transform": "Transition",
        "tab-shift-transform": "Action"
    },
    {
        "name": "Parenthetical",
        "uppercase": false,
        "text-align": "left",
        "icon": "fas fa-exclamation",
        "margin": [0, 1.9, 0, 2.1],
        "next-paragraph": "Dialogue",
        "tab-transform": "Character Cue",
        "tab-shift-transform": "Dialogue"
    },
    {
        "name": "Dialogue",
        "uppercase": false,
        "text-align": "left",
        "icon": "fas fa-comment",
        "margin": [0, 1.3, 0, 1.4],
        "next-paragraph": "Action",
        "tab-transform": "Parenthetical",
        "tab-shift-transform": "Action"
    },
    {
        "name": "Transition",
        "uppercase": true,
        "text-align": "right",
        "icon": "fas fa-camera",
        "margin": [1, 0, 0, 4.5],
        "next-paragraph": "Action",
        "tab-transform": "Transition",
        "tab-shift-transform": "Character Cue"
    },
]