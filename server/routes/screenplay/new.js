const ScreenplayData = require('./../../models/screenplayData');

module.exports = function(router) {
    /**
     * Creates new screenplay and then redirects to edition page.
     */
    router.get('/new', async function(req, res, next) {
        // Redirects to login page if user is not logged in
        if(!req.user) {
            return res.redirect('/login');
        }

        const newData = new ScreenplayData({content: []});
        newData.save((err)=> {
            console.log('saving error:');
            console.log(err);
        });
        console.log(newData);
        req.user.screenplays.push({
            dataID: newData._id,
            name: "Untitled"
        });
        await req.user.save();

        return res.redirect('/screenplay/view');
    });
}