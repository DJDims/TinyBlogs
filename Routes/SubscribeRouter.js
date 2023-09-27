import { Router } from 'express';

const subscribeRouter = Router();

//create subscribe
subscribeRouter.post('/',
    verifyToken,
);

//get subscribes
subscribeRouter.get('/',
    verifyToken,
);

//get subscribe by id
subscribeRouter.get('/',
    verifyToken,
);

//update subscribe
subscribeRouter.put('/',
    verifyToken,
);
 
//delete subscribe
subscribeRouter.delete('/',
    verifyToken,
);