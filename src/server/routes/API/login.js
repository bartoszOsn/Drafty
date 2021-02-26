const passport = require('passport');

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
function post_login(req, res, next) {
    passport.authenticate('local', (err, user)=> {
        if(err) {
          next(err);
        }
    
        if(!user) {
          return res.json({error: 'Wrong username or password.'})
        }
        req.logIn(user, function(err){
            if(err) {
                return next(err);
            }
    
            return res.json({username: user.username, body: req.body});
        })
    
      })(req, res, next);
}

module.exports = function(router) {
    router.post('/login', post_login);
} 