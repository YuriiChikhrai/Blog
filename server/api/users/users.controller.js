"use strict";

const UsersModel = require('./users.model');

exports.getLogin = (req, res) => {
    res.render('login.nunjucks');
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

};

exports.getUserById = (req, res) => {

};