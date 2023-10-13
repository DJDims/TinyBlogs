import jsonwebtoken from 'jsonwebtoken';
import slugify from'slugify';

import Article from '../Schemes/Article.js';
import User from '../Schemes/User.js';
import Comment from '../Schemes/Comment.js';
import SubscribeUser from '../Schemes/SubscribeUser.js';

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
        if (req.user.following.length === 0) return res.status(404).json({error: "You are not following anyone"});
        const articles = await Article.find({author: {$in: req.user.following}}).select('-body -comments -likes -favoriteList -favoriteCount -author -createdAt -updatedAt -slug -_id').sort({createdAt: 'desc'}).sort({createdAt: 'desc'});
        console.log(articles);
        res.json(articles);
    } catch (error) {
        res.json({error: error});
    }
}

export const findBySlug = async (req, res) => {
    try {
        const articles = req.article;
        const subscribeUser = await SubscribeUser.findByUserId(req.user._id);
        subscribeUser.articlesLeft = subscribeUser.articlesLeft - 1;
        subscribeUser.save();
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
        article.author = req.user._id;
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
        if (req.article.author.toString() !== req.user._id.toString()) return res.status(403).json({error: "You are not the author of this article"});
        
        const searchArticle = await Article.findByTitle(req.body.article.title);
        if (searchArticle && searchArticle._id.toString() !== req.article._id.toString()) return res.status(403).json({error: "Article with this title already exists"});
        
        req.article.update(req.body.article);
        await req.article.save();
        res.status(200).json(req.body.article);
    } catch (error) {
        res.json({error: error});
    }
}

export const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findBySlug(req.params.slug);
        const user = await User.getUserByToken(req.headers["x-access-token"]);
        if (article.author.toString() !== user._id.toString()) return res.status(403).send("You are not the author of this article");

        await Article.deleteOne(article);
        res.status(200).send("Article successfully deleted");
    } catch (error) {
        res.json({error: error});
    }
}

export const favoriteArticle = async (req, res) => {
    try {
        const article = await Article.findBySlug(req.params.slug);
        const user = await User.getUserByToken(req.headers['x-access-token']);
        console.log(user)
        if (user.isFavorite(article._id)) return res.status(403).send("You already have this article in favorites");
        await user.favorite(article._id);
        res.status(200).json(article);
    } catch (error) {
        res.json({error: error});
    }
}

export const unfavoriteArticle = async (req, res) => {
    try {
        const article = await Article.findBySlug(req.params.slug);
        const user = await User.getUserByToken(req.headers['x-access-token']);
        if (!user.isFavorite(article._id)) return res.status(403).send("You dont have this article in favorites");
        await user.unfavorite(article._id);
        res.status(200).json(article);
    } catch (error) {
        res.json({error: error});
    }
}