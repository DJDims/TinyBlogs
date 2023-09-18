import { findById } from '../Schemes/User';
import { create } from '../Schemes/Article';
import asyncHandler from 'express-async-handler';

const createArticle = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const author = await findById(userId);
    
    const article = await create(req.body);

});