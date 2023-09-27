import mongoose from "mongoose";
const { Schema } = mongoose;

const Subscribe = new Schema(
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
        monthsCount: {
            type: Number,
            default: 1,
            required: true
        }
    },
    { timestamps: true, versionKey: false }
);

Subscribe.statics.findByName = function (name) {
    return this.findOne({ name: name });
};

export default mongoose.model('Subscribe', Subscribe);