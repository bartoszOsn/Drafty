module.exports = function(req, res, next) {
    if(req.query.warning) {
        res.locals.warning = req.query.warning;
    }
    next();
}