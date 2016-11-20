'use strict';

const User = require('mongoose').model('User');
const jwt = require('jsonwebtoken');

exports.login = function(req, res) {
    const token = createToken(req.user);
    res.send({ token: token, user: req.user });
}

exports.register = function(req, res, next) {
    const user = new User(req.body);
    user.save(function(err) {
        if (err) {
            console.log(err);
            return next(err);
        }

        req.login(user, function(err) {
            if (err) {
                console.log(err);
                return next(err);
            } else {
                const token = createToken(user);
                return res.send({ token: token, user: req.user });
            }
        });
    });
};

const createToken = function(user) {
    return jwt.sign({
        data: user
    }, 'secret', { expiresIn: '1h' });
};
