'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = require('./config/config');
const mongoose = require('./config/mongoose');
const express = require('./config/express');

const db = mongoose();
const app = express();

app.listen(config.port);
console.log(process.env.NODE_ENV + ' server running at http://localhost:' + config.port);
