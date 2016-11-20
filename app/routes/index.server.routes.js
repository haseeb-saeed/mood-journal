'use strict';

const index = require('../controllers/index.server.controller');
const users = require('../controllers/users.server.controller');

module.exports = function(app) {
    app.route('/')
        .all(users.isLoggedIn)
         .get(index.render);
};
