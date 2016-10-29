'use strict';

const bcrypt = require('bcrypt-node');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type:String,
        trim: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre('save', function(next) {
    this.updated_at = Date.now;

    if (this.password) {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
    }

    next();
});

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

mongoose.model('User', UserSchema);
