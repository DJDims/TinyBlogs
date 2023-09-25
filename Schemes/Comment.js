import mongoose from "mongoose";
const { Schema } = mongoose;

const Comment = new Schema(
    {
        body: {
            type: String,
            required: true,
            trim: true
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

Comment.statics.getCommentById = function (id) {
    return this.findById(id);
}

export default mongoose.model('Comment', Comment);