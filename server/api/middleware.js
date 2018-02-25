"use strict";

const { celebrate } = require('celebrate');
const path = require('path');

exports.isAuthorized = (req, res, next) => {
    if(req.isAuthenticated()) next();
    else res.status(401).send("Not logged in");
};

exports.checkValidation = (modelPath, schemaName, req, res, next) => {
    const schema = require(path.join(__dirname, modelPath, modelPath + ".validation.js"));
    celebrate(schema[schemaName])(req, res, next);
};