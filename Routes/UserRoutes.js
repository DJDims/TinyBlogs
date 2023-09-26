import { Router } from 'express';
import { verifyToken } from '../Middleware/VerifyToken.js';
import { checkUserExistsByEmail, checkDuplicateUsername, checkDuplicateEmail } from '../Middleware/VerifyUser.js';
import { login, register, getCurrentUser, updateUser } from '../Controllers/UserController.js';

const userRouter = Router();

//Registration
userRouter.post('/users/',
    checkDuplicateUsername,
    checkDuplicateEmail,
    register
);

//Authentication
userRouter.post('/users/login',
    checkUserExistsByEmail,
    login
);

//Get Current User
userRouter.get('/user',
    verifyToken,
    getCurrentUser
);

//Update User
userRouter.put('/user', 
    verifyToken,
    checkDuplicateUsername,
    checkDuplicateEmail,
    updateUser
);

export default userRouter;