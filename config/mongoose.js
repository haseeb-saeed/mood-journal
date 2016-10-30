'use strict';

const config = require('./config');
const mongoose = require('mongoose');

module.exports = function() {
    const db = mongoose.connect(config.db);

    // TODO: Require all models here
    require('../app/models/user.server.model');
    require('../app/models/post.server.model');

    return db;
};
