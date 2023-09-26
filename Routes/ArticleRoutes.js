import { Router } from 'express';
import { verifyToken } from '../Middleware/VerifyToken.js';
import { checkArticleExists } from '../Middleware/VerifyArticle.js';
import { findAll, findBySlug, findByFollowedUsers, createArticle, updateArticle, deleteArticle } from '../Controllers/ArticleController.js';
import { createComment, getCommentsBySlug, deleteComment } from '../Controllers/CommentController.js';

const articleRouter = Router();

articleRouter.get('/', findAll);                                                        //list articles
articleRouter.get('/feed', verifyToken, findByFollowedUsers);                           //feed articles
articleRouter.get('/:slug', checkArticleExists, findBySlug);                          //get article by slug
articleRouter.post('/', verifyToken, createArticle);                                    //create article
articleRouter.put('/:slug', verifyToken, checkArticleExists, updateArticle);            //update article
articleRouter.delete('/:slug', verifyToken, checkArticleExists, deleteArticle);         //delete article
articleRouter.post('/:slug/comments', verifyToken, checkArticleExists, createComment);  //add comment
articleRouter.get('/:slug/comments', checkArticleExists, getCommentsBySlug);            //get all comments
articleRouter.delete('/:slug/comments/:id', checkArticleExists, deleteComment);         //delete comment

export default articleRouter;