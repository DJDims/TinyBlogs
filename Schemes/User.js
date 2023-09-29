import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";

import SubscribeUser from "./SubscribeUser.js";

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
            trim: true,
            default: "https://shorturl.at/zKV47"
        },
        following: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        favorites: [{
            type: Schema.Types.ObjectId,
            ref: 'Article'
        }],
        acesstoken: {
            type: String,
        },
        lastLogin: {
            type: Date
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

User.methods.update = function (data) {
    if (data.email) this.email = data.email;
    if (data.username) this.username = data.username;
    if (data.bio) this.bio = data.bio;
    if (data.image) this.image = data.image;
    if (data.password) this.password = bcrypt.hash(data.password, 8);
    this.save();
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

User.methods.favorite = function (articleId) {
    this.favorites.push(articleId);
    this.save();
}

User.methods.unfavorite = function (articleId) {
    this.favorites.splice(this.favorites.indexOf(articleId), 1);
    this.save();
}

User.methods.isFavorite = function (articleId) {
    if (this.favorites.includes(articleId)) return true;
}

User.methods.getSubscribeData = function () {
    return SubscribeUser.findOne({user: this._id});
}

User.methods.updateLastLogin = function () {
    this.lastLogin = Date.now();
    this.save();
}

export default mongoose.model('User', User);