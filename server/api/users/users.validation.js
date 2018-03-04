"use strict";

const { Joi } = require('celebrate');

module.exports = {
    changeRole: {
        params: {
            id: Joi.string().alphanum().length(24).required()
        },
        body: Joi.object().keys({
            newRole: Joi.string().valid('user', 'moderator', 'admin').required()
        })
    }
};