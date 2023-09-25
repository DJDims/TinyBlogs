import { Router } from 'express';
import { verifyToken } from '../Middleware/VerifyToken.js';
import {findAll, findByFollowedUsers, findById, createArticle, updateArticle, deleteArticle} from '../Controllers/ArticleController.js';
import { createComment, getCommentsBySlug, deleteComment } from '../Controllers/CommentController.js';

const articleRouter = Router();

articleRouter.get('/', findAll);                                    //list articles
articleRouter.get('/feed', verifyToken, findByFollowedUsers);       //feed articles
articleRouter.post('/', verifyToken, createArticle);                //create article
articleRouter.put('/:slug', verifyToken, updateArticle);            //update article
articleRouter.delete('/:slug', verifyToken, deleteArticle);         //delete article
articleRouter.post('/:slug/comments', verifyToken, createComment);  //add comment
articleRouter.get('/:slug/comments', getCommentsBySlug);            //get all comments
articleRouter.delete('/:slug/comments/:id', deleteComment);         //delete comment

export default articleRouter;