"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./comments.controller');

router.get('/', ctrl.getComments);

module.exports = router;