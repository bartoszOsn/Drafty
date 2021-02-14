const ScreenplayData = require('./../../models/screenplayData');

module.exports = function(router) {
    /**
     * route that deletes a screenplay.
     */
    router.get('/delete/:screenplayId', async function(req, res, next) {
        // Redirects to login page if user is not logged in
        if(!req.user) {
            return res.redirect('/login');
        }
        const id = req.params.screenplayId;
        const index = req.user.screenplays.findIndex(t=> t._id);
        if(index >= 0) {
            const screenplay = req.user.screenplays[index];
            await ScreenplayData.findByIdAndDelete(screenplay.dataID);
            req.user.screenplays.splice(index, 1);
            await req.user.save();
        }
        res.redirect('/screenplay/view');
    });
}