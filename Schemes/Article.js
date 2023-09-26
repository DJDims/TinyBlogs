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

Article.methods.update = function(data) {
    if (data.title) {
        this.title = data.title;
        this.slug = slugify(this.title, {lower: true});
    }
    if (data.description) this.description = data.description;
    if (data.body) this.body = data.body;
    if (data.tagList) {
        this.tagList = [];
        data.tagList.forEach((element, index, array) => {
            this.tagList[index] = element.toLowerCase();
        });
    }
};

Article.methods.addComment = function(comment) {
    
}

export default mongoose.model('Article', Article);