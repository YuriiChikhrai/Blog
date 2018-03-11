"use strict";

const UsersModel = require('./users.model');

exports.getLogin = (req, res) => {
    res.render('login.nunjucks');
    req.app.locals.io.to('all').emit("news", "login");
};

exports.registerUser = (req, res) => {
    UsersModel.create(req.body, (err, user) => {
        if(err) return res.status(400).send({message: err.message});
        else return res.send({message: "User created"});
    });
};

exports.logInUser = (req, res) => {
    res.send({message: "login success"});
};

exports.logOutUser = (req, res) => {
    req.session.destroy( err => {
        if(err) console.error(err);
        res.redirect('/');
    });
};

exports.changeUserRole = (req, res) => {
    UsersModel
        .findByIdAndUpdate(req.params.id, {
            $set: {
                role: req.body.newRole
            }
        })
        .exec( err => {
            if(err) return res.status(400).send({message: err.message});
            return res.send({message: "User role changed"});
        })
};

exports.getUserById = (req, res) => {

};