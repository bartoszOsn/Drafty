const ScreenplayData = require('./../../models/screenplayData');

async function getScreenplay(req, res) {
    if(!req.user) {
        return res.json({'error': 'You are not logged in.'});
    }
    const screenplay = req.user.screenplays.find(t=> t._id == req.params.id);
    if(!screenplay) {
        return res.json({'error': "Screenplay with given ID doesn't exist or belongs to different user."});
    }
    const screenplayDataId = screenplay.dataID;
    const data = await ScreenplayData.findById(screenplayDataId);
    const processedData = {
        content: data.content.map(t=> ({text: t.blockText, type: t.blockType}))
    };
    processedData.author = req.user.username;
    processedData.title = screenplay.name;
    return res.json(processedData);
}

async function postScreenplay(req, res) {
    if(!req.user) {
        return res.json({'error': 'You are not logged in.'});
    }
    const screenplay = req.user.screenplays.find(t=> t._id == req.params.id);
    if(!screenplay) {
        return res.json({'error': "Screenplay with given ID doesn't exist or belongs to different user."});
    }
    const screenplayDataId = screenplay.dataID;
    const updated = {
        content: req.body.content.map(t=> ({'blockType': t.type, 'blockText': t.text}))
    };
    await ScreenplayData.updateOne({_id: screenplayDataId}, updated);
    return res.sendStatus(200);
}

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
async function postRename(req, res) {
    if(!req.user) {
        return res.json({'error': 'You are not logged in.'});
    }
    const screenplay = req.user.screenplays.find(t=> t._id == req.params.id);
    if(!screenplay) {
        return res.json({'error': "Screenplay with given ID doesn't exist or belongs to different user."});
    }
    const title = req.body.title;
    screenplay.name = title;
    await req.user.save();
    return res.sendStatus(200);
}

module.exports = function(router) {
    router.get('/screenplay/:id', getScreenplay);
    router.post('/screenplay/:id', postScreenplay);
    router.post('/screenplay/rename/:id', postRename);
}