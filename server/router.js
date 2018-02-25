"use strict";

const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const UsersModel = mongoose.model('UsersModel');
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

router.use(passport.initialize());
router.use(passport.session());

function importModule(name) {
    return require(path.join(__dirname, "api", name));
}

// Index API
router.use('/', importModule("main"));

// POSTS API
router.use('/posts', importModule("posts"));

// Users API
router.use('/users', importModule("users"));

// catch 404 and forward to error handler
router.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = router;