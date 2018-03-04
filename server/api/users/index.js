"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./users.controller');
const passport = require('passport');
const authorization = require('express-rbac');
const _ = require('lodash');
const middle = require('../middleware');

// TODO: ДЗ - прописать валидацию для входа/регистрации
// TODO: ДЗ - навешить проверки на авторизацию для /logout
// TODO: Сделать подтверждение по email
// TODO: Сделать управление ролями

router.get('/login', ctrl.getLogin);

router.post('/register', ctrl.registerUser);

router.post('/login', passport.authenticate('local',{}), ctrl.logInUser);

router.get('/logout', ctrl.logOutUser);

router.get('/:id', ctrl.getUserById);

router.put('/:id', authorization.hasPermission("changeRole"), _.partial(middle.checkValidation, 'users', 'changeRole'), ctrl.changeUserRole);

// TODO: get user info by id (for authorized)
// TODO: update user (for user/admin)
// TODO: ban user (for admin)
// TODO: change password

module.exports = router;