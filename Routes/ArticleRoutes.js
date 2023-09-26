import { Router } from 'express';
import { verifyToken } from '../Middleware/VerifyToken.js';
import { checkArticleExists } from '../Middleware/VerifyArticle.js';
import { findAll, findBySlug, findByFollowedUsers, createArticle, updateArticle, deleteArticle, favoriteArticle, unfavoriteArticle } from '../Controllers/ArticleController.js';
import { createComment, getCommentsBySlug, deleteComment } from '../Controllers/CommentController.js';

const articleRouter = Router();

//list articles
articleRouter.get('/', findAll);

//feed articles
articleRouter.get('/feed',
    verifyToken,
    findByFollowedUsers
);

//get article by slug
articleRouter.get('/:slug',
    checkArticleExists,
    findBySlug
);

//create article
articleRouter.post('/',
    verifyToken,
    createArticle
);

//update article
articleRouter.put('/:slug',
    verifyToken,
    checkArticleExists,
    updateArticle
);

//delete article
articleRouter.delete('/:slug',
    verifyToken,
    checkArticleExists,
    deleteArticle
);

//add comment
articleRouter.post('/:slug/comments',
    verifyToken,
    checkArticleExists,
    createComment
);

//get all comments
articleRouter.get('/:slug/comments',
    checkArticleExists,
    getCommentsBySlug
);

//delete comment
articleRouter.delete('/:slug/comments/:id',
    checkArticleExists,
    deleteComment
);

//favorite article
articleRouter.post('/:slug/favorite',
    verifyToken,
    checkArticleExists,
    favoriteArticle
);
    
//unfavorite article
articleRouter.delete('/:slug/favorite',
    verifyToken,
    checkArticleExists,
    unfavoriteArticle
);

export default articleRouter;