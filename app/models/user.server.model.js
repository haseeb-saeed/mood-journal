'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    username: {
        type:String,
        trim: true,
        unique: true,
    },
    password: String,
});

mongoose.model('User', UserSchema);
