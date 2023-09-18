import { Router } from 'express';
import {findAll, findById, create} from '../Controllers/ArticleController.js';

const articleRouter = Router();

articleRouter.post('/', create);
// articleRouter.get('/', (req, res) => {res.send("Hello from Article Controller")});
articleRouter.get('/', findAll);

export default articleRouter;