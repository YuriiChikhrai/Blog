"use strict";

const PostsModel = require('./posts.model');

exports.getPosts = (req, res) => {
    // TODO: ДЗ - сделать пагинацию
    // req.query / req.params ???
    PostsModel
        .find({show: true})
        .sort({addedAt: -1})
        .skip(0) // TODO: Not static
        .limit(25) // TODO: Not static
        .populate([
            {
                path: "addedBy",
                select: "username"
            },
            {
                path: "comments",
                select: "addedAt addedBy text rate",
                match: {
                    show: true
                },
                populate: {
                    path: "addedBy",
                    select: "username"
                }
            }
        ])
        .lean()
        .exec( (err, docs) => {
            if(err) return res.status(400).send(err.message || err);
            res.send(docs);
        });
};

exports.addNewPost = (req, res) => {
    PostsModel.create({
        text: req.body.text,
        title: req.body.title,
        addedBy: req.user._id,
        tags: req.body.tags,
        comments: req.body.comments
    }, (err, doc) => {
        if(err) return res.status(400).send(err.message || err);
        res.send(doc);
    })
};