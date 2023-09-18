import Article from '../Schemes/Article.js';

export const findAll = async (req, res) => {
    try {
        const articles = await Article.find().exec();
        res.json(articles);
    } catch (error) {
        res.json({error: error});
    }
}

export const findById = async (req, res) => {
    try {
        const articles = await Article.find({"_id": req.params.id});
        res.status(200).json(articles);
    } catch (error) {
        res.json({error: error});
    }
}

export const create = async (req, res) => {
    try {
        // const article = await Article.create(req.body);
        const article = new Article(req.body);
        await article.save();
        res.status(200).json(article);
    } catch (error) {
        res.json({error: error});
    }
}