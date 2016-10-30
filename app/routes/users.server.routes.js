'use strict';

const passport = require('passport');
const users = require('../controllers/users.server.controller');

module.exports = function(app) {
    app.route('/login')
        .all(users.isNotLoggedIn)
        .get(users.renderLogin)
        .post(passport.authenticate('local-login',  {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
        }));

    app.route('/logout')
        .all(users.isLoggedIn)
        .get(users.renderLogout);

    app.route('/register')
        .all(users.isNotLoggedIn)
        .get(users.renderRegister)
        .post(users.register);
};
