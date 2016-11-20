'use strict';

const passport = require('passport');
const users = require('../controllers/users.server.controller');

module.exports = function(app) {
    app.route('/api/authenticate')
        .post(passport.authenticate('local-login'), users.login);

    app.route('/api/register')
        .post(users.register);
};
