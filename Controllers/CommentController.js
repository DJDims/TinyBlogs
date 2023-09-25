import Comment from '../Schemes/Comment.js';
import User from '../Schemes/User.js';
import Article from '../Schemes/Article.js';

export const getCommentsBySlug = async (req, res) => {
    try {
        const article = await Article.findBySlug(req.params.slug);
        if (!article) return res.status(404).json({error: "Article not found"});

        const comments = await Comment.find({article: article._id});
        res.status(200).json(comments);

    } catch (error) {
        res.json({error: error});
    }
}

export const createComment = async (req, res) => {
    try {
        const article = await Article.findBySlug(req.params.slug);
        if (!article) return res.status(404).json({error: "Article not found"});

        const user = await User.getUserByToken(req.headers["x-access-token"]);
        const comment = new Comment(req.body.comment);
        comment.article = article._id;
        comment.author = user._id;

        comment.save();
        res.status(200).json(comment);

    } catch (error) {
        res.json({error: error});
    }
}

export const deleteComment = async (req, res) => {
    try {
        const article = await Article.findBySlug(req.params.slug);
        if (!article) return res.status(404).json({error: "Article not found"});

        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json({error: "Comment not found"});
        
        const user = await User.getUserByToken(req.headers["x-access-token"]);
        if (user._id.toString() !== comment.author.toString()) return res.status(403).json({error: "You are not allowed to delete this comment"});

        await Comment.deleteOne(comment);
        res.status(200).json("Successfully deleted comment");

    } catch (error) {
        res.json({error: error});
    }
}