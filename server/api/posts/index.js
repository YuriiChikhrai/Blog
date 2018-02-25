"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./posts.controller');

router.get('/', ctrl.getPosts);

// getPosts
// sendNewPost
// updatePost
// deletePost

module.exports = router;