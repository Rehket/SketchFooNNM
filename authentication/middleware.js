/**
 * Created by adama on 5/13/2017.
 */


// file:authentication/middleware.js
function authenticationMiddleware () {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/')
    }
}


module.exports = authenticationMiddleware