"use strict";

const CommentsModel = require('./comments.model');
const mongoose = require('mongoose');

exports.addCommentToPost = (req, res) => {
    let createObj = {
        addedBy: mongoose.Types.ObjectId(req.user._id),
        text: req.body.text,
        rate: req.body.rate,
        postId: mongoose.Types.ObjectId(req.params.id)
    };
    if(req.body.parentId) createObj.parentId = req.body.parentId;

    CommentsModel
        .create(createObj, err => {
            if(err) return res.status(400).send({message: err.message});
            res.send({message: "Comment add successful"});
        });
};