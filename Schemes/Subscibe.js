import mongoose from "mongoose";
const { Schema } = mongoose;

const Subscribe = new Subscribe(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        articlesCount: {
            type: Number,
            required: true
        },
        mounthCount: {
            type: Number,
            default: 0,
            required: true
        }
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Subscribe', Subscribe);