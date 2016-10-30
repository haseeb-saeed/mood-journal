'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = require('./config/config');
const mongoose = require('./config/mongoose');
const express = require('./config/express');

const db = mongoose();
const app = express();

const passport = require('./config/passport')();

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        const status = err.status || 500;
        res.status(status);
        res.render('error', {
            message: err.message,
            status: status,
        });
    });
}

app.listen(config.port);
console.log(process.env.NODE_ENV + ' server running at http://localhost:' + config.port);
