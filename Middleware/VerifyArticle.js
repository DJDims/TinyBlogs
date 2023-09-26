import Article from '../Schemes/Article.js';

export const checkArticleExists = async (req, res, next) => {
    const article = await Article.findBySlug(req.params.slug);
    if (!article) return res.status(404).json({error: "Article not found"});
    req.article = article;
    next();
}