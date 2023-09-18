import mongoose from "mongoose";
const { Schema } = mongoose;

const User = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        bio: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        followers: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        token: {
            type: String,
            required: true
        },
        password: {
            type: String,
            default: Date.now,
            required: true
        },
        subscribe: {
            type: Schema.Types.ObjectId,
            ref: 'Subscribe',
        },
        subscribedDate: {
            type: Date
        },
        subscribeDateUpdate: {
            type: Date,
        },
        articlesLeft: {
            type: Number,
            default: 5
        },
        monthsLeft: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('User', User);