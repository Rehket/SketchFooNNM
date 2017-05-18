/**
 * Created by adama on 5/13/2017.
 */



const passport = require('passport');



function initUser (app) {
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));
}

module.exports = initUser;