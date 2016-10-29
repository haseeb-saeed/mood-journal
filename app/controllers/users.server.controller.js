'use strict';

const User = require('mongoose').model('User');

exports.renderLogin = function(req, res) {
    if (req.user) {
        return res.redirect('/');
    }

    res.render('login');
};

exports.renderLogout = function(req, res) {
    req.logout();
    res.redirect('/')
};

exports.renderRegister = function(req, res) {
    if (req.user) {
        return res.redirect('/');
    }

    res.render('register');
};

exports.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    // Redirect to login page if not logged in
    res.redirect('/login');
};

exports.register = function(req, res, next) {
    if (req.user) {
        return res.redirect('/');
    }

    const user = new User(req.body);
    user.save(function(err) {
        if (err) {
            return next(err);
        }

        req.login(user, function(err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    });
};
