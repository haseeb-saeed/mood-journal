'use strict';

const bcrypt = require('bcrypt-node');
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

UserSchema.pre('save', function(next) {
    if (this.password) {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
    }

    next();
});

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

mongoose.model('User', UserSchema);
