module.exports = function(router) {
    /**
     * Creates new screenplay and then redirects to edition page.
     */
    router.get('/new', async function(req, res, next) {
        // Redirects to login page if user is not logged in
        if(!req.user) {
            return res.redirect('/login');
        }

        const screenplays = req.user.screenplays;
        console.log(screenplays);
        res.render('screenplays/view', {user: req.user, screenplays});
    });
}