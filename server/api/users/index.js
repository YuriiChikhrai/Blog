"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./users.controller');
const validation = require('./users.validation');
const passport = require('passport');

router.get('/login', ctrl.getLogin);

router.post('/register', ctrl.registerUser);

router.post('/login', passport.authenticate('local',{}), ctrl.logInUser);

router.get('/logout', ctrl.logOutUser);

router.get('/:id', ctrl.getUserById);

// /updateUser
// /banUser

module.exports = router;