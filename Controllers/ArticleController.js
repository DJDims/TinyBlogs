import jsonwebtoken from 'jsonwebtoken';
import slugify from'slugify';

import Article from '../Schemes/Article.js';
import User from '../Schemes/User.js';
import Comment from '../Schemes/Comment.js';

export const findAll = async (req, res) => {
    try {
        const articles = await Article.getAll();
        res.json(articles);
    } catch (error) {
        res.json({error: error});
    }
}

export const findByFollowedUsers = async (req, res) => {
    try {
        const user = await User.getUserByToken(req.headers["x-access-token"]);
        if (user.following.length === 0) return res.status(404).json({error: "You are not following anyone"});
        const articles = await Article.find({author: {$in: user.following}}).exec();
        res.json(articles);
    } catch (error) {
        res.json({error: error});
    }
}

export const findBySlug = async (req, res) => {
    try {
        const articles = await Article.find({slug: req.params.slug});
        res.status(200).json(articles);
    } catch (error) {
        res.json({error: error});
    }
}

export const createArticle = async (req, res) => {
    try {
        const article = new Article(req.body.article);
        if (await Article.findByTitle(req.body.article.title)) return res.status(403).json({error: "Article with this title already exists"});

        article.slug = slugify(article.title, {lower: true});
        const user = await User.getUserByToken(req.headers["x-access-token"]);
        article.author = user._id;
        article.tagList.forEach((element, index, array) => {
            array[index] = element.toLowerCase();
        });
        await article.save();
        res.status(200).json(article);
    } catch (error) {
        res.json({error: error});
    }
}

export const updateArticle = async (req, res) => {
    try {
        const user = await User.getUserByToken(req.headers["x-access-token"]);
        if (article.author.toString() !== user._id.toString()) return res.status(403).json({error: "You are not the author of this article"});
        
        const searchArticle = await Article.findByTitle(req.body.article.title);
        if (searchArticle && searchArticle._id.toString() !== article._id.toString()) return res.status(403).json({error: "Article with this title already exists"});
        
        article.setNewData(req.body.article);
        await article.save();
        res.status(200).json("Article successfully updated");
    } catch (error) {
        res.json({error: error});
    }
}

export const deleteArticle = async (req, res) => {
    try {
        const user = await User.getUserByToken(req.headers["x-access-token"]);
        if (article.author.toString() !== user._id.toString()) return res.status(403).json({error: "You are not the author of this article"});

        await Article.deleteOne(article);
        res.status(200).json({message: "Article successfully deleted"});
    } catch (error) {
        res.json({error: error});
    }
}