import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";

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
        following: [{
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

User.statics.getUserByToken = function (token) {
    const tokenData = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = this.findOne({_id: tokenData.userId});
    return user;
}

User.statics.getUserByUsername = function (username) {
    const user = this.findOne({username: username}).exec();
    return user;
}

User.statics.getUserByEmail = function (email) {
    const user = this.findOne({email: email}).exec();
    return user;
}

User.methods.follow = function (userId) {
    this.following.push(userId);
    this.save();
}

User.methods.unfollow = function (userId) {
    this.following.splice(this.following.indexOf(userId), 1);
    this.save();
}

User.methods.isFollowing = function (userId) {
    if (this.following.includes(userId)) return true;
    else return false;
}

export default mongoose.model('User', User);