import Comment from '../Schemes/Comment.js';
import User from '../Schemes/User.js';
import Article from '../Schemes/Article.js';

export const getCommentsBySlug = async (req, res) => {
    try {
        const comments = await Comment.find({article: req.article._id});
        res.status(200).json(comments);
    } catch (error) {
        res.json({error: error});
    }
}

export const createComment = async (req, res) => {
    try {
        const comment = new Comment(req.body.comment);
        comment.article = req.article._id;
        comment.author = req.user._id;
        comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.json({error: error});
    }
}

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).send("Comment not found");
        if (req.user._id.toString() !== comment.author.toString()) return res.status(403).send("You are not allowed to delete this comment");

        await Comment.deleteOne(comment);
        res.status(200).send("Successfully deleted comment");
    } catch (error) {
        res.json({error: error});
    }
}