const PDFDocument = require('pdfkit');
const fs = require('fs');
const pageData = require('./../shared/pageData');
const lineTypes = require('./../shared/lineTypes');

function inToPoints(inches) {
    return inches * 72;
}

/**
 * creates titlepage.
 * @param {PDFDocument} doc - document object
 * @param {string} title - title of screenplay
 * @param {string} author - author of screenplay
 */
function addTitlePage(doc, title, author) {
    const options = {
        lineBreak: true,
        align: 'center'
    };

    doc.addPage({
        margin: 0
    });
    doc.moveDown(25);
    doc
        .text(title.toUpperCase(), {...options, underline: true}).moveDown(4)
        .text('written by', options).moveDown()
        .text(author, options);
}

/**
 * Adds script to pdf doc
 * @param {PDFDocument} doc 
 * @param {Array} script 
 */
function addScript(doc, script) {
    doc.addPage();
    for(let paragraph of script) {
        addParagraph(doc, paragraph.blockType, paragraph.blockText);
    }
}

/**
 * Adds paragraph
 * @param {PDFDocument} doc - Document object
 * @param {string} type - type of paragraph
 * @param {string} text - text of paragraph
 */
function addParagraph(doc, type, text) {
    const lineType = lineTypes.find((t)=> t.name == type);
    if(lineType.uppercase) {
        text = text.toUpperCase();
    }

    let width = pageData.size[0]
        - pageData.margin[1] - pageData.margin[3]
        - lineType.margin[1] - lineType.margin[3];
    width = inToPoints(width);

    const x = inToPoints(pageData.margin[3] + lineType.margin[3]);
    const y = doc.y;

    const options = {
        'align': lineType['text-align'],
        width
    };

    doc
        .moveDown(lineType.margin[0]+1)
        .text(text, x, y, options)
        .moveDown(lineType.margin[2]+1);
}

/**
 * Creates pdf file.
 * @param {string} path - path where file will be created, including file name
 * @param {string} title - title written in titlepage
 * @param {string} author - author written in titlepage
 * @param {Array} script -content of the screenplay.
 */
function createPdf(path, title, author, script) {
    const doc = new PDFDocument({
        autoFirstPage: false,
        size: pageData.size.map(t=> inToPoints(t)),
        margins: {
            top: inToPoints(pageData.margin[0]),
            right: inToPoints(pageData.margin[1]),
            bottom: inToPoints(pageData.margin[2]),
            left: inToPoints(pageData.margin[3]),
        }
    });

    doc.pipe(fs.createWriteStream(path));

    doc.font('Courier-Bold').fontSize(12);
    addTitlePage(doc, title, author);
    addScript(doc, script);
    doc.end();
    console.log(`[CREATED AT ${path}]`);
}

module.exports = createPdf;

// === TEST ===
/*
// Generating script
const script = [];
for(let i = 0; i < 10; i++) {
    script.push({
        blockType: 'Scene',
        blockText: 'Ext — Dairy Farm—day'
    });
    script.push({
        blockType: 'Action',
        blockText: 'The modest dairy farm in the countryside of Nancy, France (what the French call cow country).'
    });
    for(let j = 0; j < 5; j++) {
        script.push({
            blockType: 'Character Cue',
            blockText: 'Dilios'
        });
        script.push({
            blockType: 'Dialogue',
            blockText: 'The mother of three takes a carafe of milk out of the icebox and pours a tall glass of the fresh white liquid for the colonel.'
        });
        script.push({
            blockType: 'Character Cue',
            blockText: 'Leonidas'
        });
        script.push({
            blockType: 'Dialogue',
            blockText: 'The modest dairy farm in the countryside of Nancy, France... what the French call cow country.'
        });
    }
}
script.push({
    blockType: 'Transition',
    blockText: 'The end.'
});
createPdf('./pdf.pdf', 'Dark, almost black', 'Bartosz Osinski', script);*/