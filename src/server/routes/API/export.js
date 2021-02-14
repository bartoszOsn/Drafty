const path = require('path');
const fs = require('fs');
const createPdf = require('./../../pdf');
const ScreenplayData = require('./../../models/screenplayData');

/**
 * Route for downloading screenplay in pdf
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
async function exportPdf(req, res) {
    if(!req.user) {
        return res.json({'error': 'You are not logged in.'});
    }
    const id = req.params.id;
    const screenplay = req.user.screenplays.find(t=> t._id == id);
    if(!screenplay) {
        return res.json({'error': "Screenplay with given ID doesn't exist or belongs to different user."});
    }

    const title = req.params.title;
    const author = req.params.author;

    const screenplayDataId = screenplay.dataID;
    const data = await ScreenplayData.findById(screenplayDataId);

    const filePath = path.resolve(__dirname, `./../../pdfs/${id}.pdf`);
    createPdf(filePath, title, author, data.content);

    return res.download(filePath, ()=> {
        //fs.unlinkSync(filePath);
    });
}

module.exports = function(router) {
    router.get('/export/:id/:title/:author', exportPdf);
}