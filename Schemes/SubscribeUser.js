import mongoose from "mongoose";
import addMonths from "date-fns/addMonths/index.js";
const { Schema } = mongoose;

const SubscribeUser = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        subscribe: {
            type: Schema.Types.ObjectId,
            ref: 'Subscribe',
        },
        start: {
            type: Date,
            default: Date.now,
        },
        end: {
            type: Date,
        },
        articlesLeft: {
            type: Number,
        },
        monthsLeft: {
            type: Number,
        }
    },
    { timestamps: true, versionKey: false }
);

SubscribeUser.pre('save', function () {
    this.end = addMonths(this.start, 1);
})

SubscribeUser.statics.findByUserId = function (userId) {
    return this.findOne({ user: userId });
}

SubscribeUser.methods.setSubscribe = function (subscribe) {
    this.subscribe = subscribe._id;
    this.start = Date.now();
    this.end = addMonths(this.start, 1);
    this.articlesLeft = subscribe.articlesCount;
    this.monthsLeft = subscribe.monthsCount;
    this.save();
}

export default mongoose.model('SubscribeUser', SubscribeUser);