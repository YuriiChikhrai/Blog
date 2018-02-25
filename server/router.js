"use strict";

const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UsersModel = require('./api/users/users.model');

module.exports = (app) => {
    // Passport local strategy
    passport.use(new LocalStrategy({passReqToCallback: true},
        function(req, username, password, done) {
            UsersModel.checkPassword(username, password, (err, userChecked) => {
                if(err) done({message: err.message});
                else if (userChecked) done(false, userChecked);
                else done({message: "Login or password is not correct"});
            });
        }
    ));

    passport.serializeUser(function(user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function(id, cb) {
        UsersModel
            .findById(id)
            .select('username role')
            .lean()
            .exec(function (err, user) {
                if (err) { return cb(err); }
                cb(null, user);
            });
    });

    app.use(passport.initialize());
    app.use(passport.session());

    function importModule(name) {
        return require(path.join(__dirname, "api", name));
    }

    // Index API
    app.use('/', importModule("main"));

    // POSTS API
    app.use('/posts', importModule("posts"));

    // Users API
    app.use('/users', importModule("users"));

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
};