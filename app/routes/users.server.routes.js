'use strict';

const passport = require('passport');
const users = require('../controllers/users.server.controller');

module.exports = function(app) {
    app.route('/login')
        .get(users.renderLogin)
        .post(passport.authenticate('local-login',  {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
        }));

    app.get('/logout', users.renderLogout);

    app.route('/register')
        .get(users.renderRegister)
        .post(users.register);
};
