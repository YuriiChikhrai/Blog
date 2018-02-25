"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./posts.controller');
const middle = require('../middleware');
const _ = require('lodash');

router.get('/', ctrl.getPosts);
// getPostById

router.post('/', middle.isAuthorized, _.partial(middle.checkValidation, 'posts', 'validateReceivedPost') ,ctrl.addNewPost);


// sendNewPost
// updatePost
// deletePost

module.exports = router;