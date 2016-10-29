'use strict';

const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');

module.exports = function() {
    const app = express();

    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    app.use(bodyParser.json());

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    // TODO: Require routes here

    app.use(express.static('./public'));

    return app;
};
