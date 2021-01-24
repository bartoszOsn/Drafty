module.exports = function(router) {
    /**
     * route that displays all screenplays that belong to logged user.
     */
    router.get('/view', async function(req, res, next) {
        // Redirects to login page if user is not logged in
        if(!req.user) {
            return res.redirect('/login');
        }

        const screenplays = req.user.screenplays;
        console.log(screenplays);
        res.render('screenplays/view', {user: req.user, screenplays});
    });
}