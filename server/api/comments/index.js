"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./comments.controller');
const middle = require('../middleware');
const authorization = require('express-rbac');
const _ = require('lodash');

router.post('/:id', authorization.hasPermission("addComment"), _.partial(middle.checkValidation, 'comments', 'addNewComment'), ctrl.addCommentToPost);

// TODO: disable comment (for admin)
// TODO: edit comment (for creator/admin)

module.exports = router;