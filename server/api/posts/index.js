"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./posts.controller');
const middle = require('../middleware');
const _ = require('lodash');
const authorization = require('express-rbac');

router.get('/', _.partial(middle.checkValidation, 'posts', 'getPosts'), ctrl.getPosts);

router.get('/:id', _.partial(middle.checkValidation, 'general', 'getById'), ctrl.getPostById);

router.post('/', authorization.hasPermission('addPost'), _.partial(middle.checkValidation, 'posts', 'validateReceivedPost'), ctrl.addNewPost);

router.get('/upload', ctrl.upload);
router.post('/upload', ctrl.uploadImage);

// TODO: updatePost (for moderator/admin)
// TODO: disable post (for moderator/admin)
// TODO: delete post (for moderator/admin)

module.exports = router;