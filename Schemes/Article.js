import mongoose from "mongoose";
const { Schema } = mongoose;

const Article = new Schema(
    {
        slug: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        tagList: [
            { 
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Tag'

            }
        ],
        body: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        favoriteList: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        favoriteCount: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model('Article', Article);