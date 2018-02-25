"use strict";

const { Joi } = require('celebrate');

module.exports = {
    validateReceivedPost: {
        body: Joi.object().keys({
            text: Joi.string().min(3).max(5000).required(),
            title: Joi.string().min(3).max(100).required(),
            tags: Joi.array().items(Joi.string().min(2).max(24).allow("")).default([]),
            comments: Joi.array().items(Joi.string().length(24).alphanum().allow("")).default([])
        })
    }
};