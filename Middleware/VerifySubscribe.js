import Subscribe from "../Schemes/Subscribe.js";

export const checkSubscribeExists = async (req, res, next) => {
    const subscribe = await Subscribe.findByName(req.params.name);
    if (!subscribe) return res.status(404).json({error: "Subscribe not found"});
    req.subscribe = subscribe;
    next();
}

export const checkArticlesLeft = async (req, res, next) => {
    const subcribe = await req.user.getSubscribeData();
    if (subcribe.articlesLeft <= 0) return res.status(403).json({error: "You have no articles left"});
    next();
}