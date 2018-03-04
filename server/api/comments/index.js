"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./comments.controller');
const middle = require('../middleware');
const authorization = require('express-rbac');
const _ = require('lodash');

// router.get('/', ctrl.getComments);

router.post('/:id', authorization.hasPermission("addComment"), _.partial(middle.checkValidation, 'comments', 'addNewComment'), ctrl.addCommentToPost);

module.exports = router;