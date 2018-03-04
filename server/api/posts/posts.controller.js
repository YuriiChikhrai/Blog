"use strict";

const PostsModel = require('./posts.model');
const mongoose = require('mongoose');
const path = require('path');

exports.getPosts = (req, res) => {

    PostsModel
        .find({show: true})
        .sort({[req.query.sortField]: req.query.sortValue})
        .skip(req.query.limit * (req.query.page - 1))
        .limit(req.query.limit)
        .select('title text addedAt addedBy')
        .populate([
            {
                path: "addedBy",
                select: "username"
            }
        ])
        .lean()
        .exec( (err, docs) => {
            if(err) return res.status(400).send(err.message || err);
            res.send(docs);
        });
};


exports.getPostById = async (req, res) => {
    try {
        const post = await PostsModel
            .findById(req.params.id)
            .populate([
                {
                    path: "addedBy",
                    select: "username"
                }
            ])
            .lean()
            .exec();

        if(!post) {
            return res.status(404).send({message: "Not found"});
        }

        const comment = await mongoose
            .model("CommentsModel")
            .find({
                postId: mongoose.Types.ObjectId(req.params.id),
                show: true
            })
            .sort({addedAt: -1})
            .populate([
                {
                    path: "addedBy",
                    select: "username"
                }
            ])
            .lean()
            .exec();

        post.comments = comment;

        res.send(post);
    } catch(e) {
        console.error("{E} getPostById", e.message);
        res.status(400).send(e.message || e);
    }
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

exports.upload = (req, res) => {
    res.render('upload.nunjucks');
};

exports.uploadImage = (req, res) => {
    let sampleFile = req.files.image;

    const pathFile = path.join(__dirname, '..', '..', '..', 'client', 'public', sampleFile.name);
    sampleFile.mv(pathFile, (err) => {
        if (err) return res.status(500).send(err);
        res.send({message: 'File uploaded!'});
    });
};