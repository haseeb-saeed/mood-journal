'use strict';

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');

module.exports = function() {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Should I rename 'local' to something else?
    passport.use('local-login', new localStrategy({
        passReqToCallback: true,
    }, function(req, username, password, done) {
        process.nextTick(function() {
            User.findOne({ 'username': username }, function(err, user) {
                if (err) {
                    return done(err);
                }

                // User doesn't exist exists
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }

                // Passwords don't match
                if (!user.validPassword(password)) {
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                }

                return done(null, user);
            });
        });
    }));
};
