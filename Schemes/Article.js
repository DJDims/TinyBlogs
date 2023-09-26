import mongoose from "mongoose";
import slugify from "slugify";
const { Schema } = mongoose;

const Article = new Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true
        },
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        tagList: [{ 
            type: String
        }],
        body: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
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

Article.statics.getAll = function() {
    return this.find().select('-body -comments -likes -favoriteList -favoriteCount').sort({createdAt: 'desc'});
}

Article.statics.findByTitle = function(title) {
    return this.findOne({title: title});
}

Article.statics.findBySlug = function(slug) {
    return this.findOne({slug: slug});
}

Article.statics.getAllTags = function() {
    return this.distinct('tagList');
}

Article.methods.setNewData = function(newData) {
    this.title = newData.title;
    this.description = newData.description;
    this.body = newData.body;
    this.slug = slugify(this.title, {lower: true});
    if (newData.tagList) {
        newData.tagList.forEach((element, index, array) => {
            this.tagList[index] = element.toLowerCase();
        });
    }
};

Article.methods.addComment = function(comment) {
    
}

export default mongoose.model('Article', Article);