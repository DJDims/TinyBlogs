import mongoose from "mongoose";
const { Schema } = mongoose;

const Tag = new Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Tag', Tag);