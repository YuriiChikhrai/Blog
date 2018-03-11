"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./comments.controller');
const middle = require('../middleware');
const authorization = require('express-rbac');
const _ = require('lodash');

/**
 * @api {post} /comments/:id Add comment to post
 * @apiName addCommentToPost
 * @apiVersion 1.0.0
 * @apiGroup Comments
 *
 * @apiParam {String{2..10000}} text Text of comment
 * @apiParam {Number{1..5}} [rate=3] Rate of post
 * @apiParam {String{24}} [parentId] Id of parent comment
 *
 *
 * @apiSuccess {String} message Success message
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "message": "Comment add successful"
 *     }
 *
 * @apiSuccessExample {json} Test Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "message": "test response"
 *     }
 *
 * @apiError {String} message Error message
 *
 * @apiErrorExample Not found:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "message": "UserNotFound"
 *     }
 */
router.post('/:id', authorization.hasPermission("addComment"), _.partial(middle.checkValidation, 'comments', 'addNewComment'), ctrl.addCommentToPost);

// TODO: disable comment (for admin)
// TODO: edit comment (for creator/admin)

module.exports = router;