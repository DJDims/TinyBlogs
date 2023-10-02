import { Router } from 'express';
import { verifyToken } from '../Middleware/VerifyToken.js';
import { getSubscribes, subscribeForTarif } from '../controllers/SubscribeController.js';
import { checkSubscribeExists } from '../Middleware/VerifySubscribe.js';

const subscribeRouter = Router();

//get subscribes
subscribeRouter.get('/',
    verifyToken,
    getSubscribes
);

//subscribe
subscribeRouter.post('/:name',
    verifyToken,
    checkSubscribeExists,
    subscribeForTarif
);

export default subscribeRouter;