import mongoose from "mongoose";
const { Schema } = mongoose;

const User = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        bio: {
            type: String,
            required: false,
            trim: true
        },
        image: {
            type: String,
            required: false,
            trim: true
        },
        followers: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        acesstoken: {
            type: String,
        },
        refreshtoken: {
            type: String,
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

export default mongoose.model('User', User);