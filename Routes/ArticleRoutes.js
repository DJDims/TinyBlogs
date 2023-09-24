import { Router } from 'express';
import { verifyToken } from '../Middleware/VerifyToken.js';
import {findAll, findById, create} from '../Controllers/ArticleController.js';

const articleRouter = Router();

articleRouter.get('/', findAll);
articleRouter.get('/feed', verifyToken);
articleRouter.post('/', create);

export default articleRouter;