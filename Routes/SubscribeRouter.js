import { Router } from 'express';
import { verifyToken } from '../Middleware/VerifyToken.js';
import { subscribeForTarif } from '../controllers/SubscribeController.js';
import { checkSubscribeExists } from '../Middleware/VerifySubscribe.js';

const subscribeRouter = Router();

//get subscribes
subscribeRouter.get('/',
    verifyToken,
);

//subscribe
subscribeRouter.post('/:name',
    verifyToken,
    checkSubscribeExists,
    subscribeForTarif
);