"use strict";

const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
    addedAt: {type: Date, default: Date.now},
    addedBy: {type: Schema.ObjectId, ref: "UsersModel"},
    show: {type: Boolean, default: true},
    text: {type: String},
    rate: {type: Number, min: 1, max: 5, default: 3}
}, {
    collection: "CommentsCollection"
});

module.exports = mongoose.model("CommentsModel", CommentsSchema);