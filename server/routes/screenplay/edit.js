module.exports = function(router) {
    /**
     * route that deletes a screenplay.
     */
    router.get('/edit/:screenplayId', async function(req, res, next) {
        // Redirects to login page if user is not logged in
        if(!req.user) {
            return res.redirect('/login');
        }
        
    });
}