import mongoose from "mongoose";
const { Schema } = mongoose;

const Comment = new Schema(
    {
        body: {
            type: String,
            required: true,
            trim: true
        },
        date: {
            type: Date,
            default: Date.now,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        article: {
            type: Schema.Types.ObjectId,
            ref: 'Article',
            required: true
        }
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Comment', Comment);