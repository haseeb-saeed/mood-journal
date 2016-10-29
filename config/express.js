'use strict';

const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

module.exports = function() {
    const app = express();

    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    app.use(bodyParser.json());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: 'OurSuperSecretCookieSecret',
    }));

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    // TODO: Require routes here
    require('../app/routes/index.server.routes')(app);
    require('../app/routes/users.server.routes')(app);

    app.use(express.static('./public'));

    return app;
};
