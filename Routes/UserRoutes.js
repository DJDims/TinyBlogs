import { Router } from 'express';
import { verifyToken } from '../Middleware/VerifyToken.js';
import { checkUserExistsByEmail } from '../Middleware/VerifyUser.js';
import { login, register, getCurrentUser } from '../Controllers/UserController.js';

const userRouter = Router();

userRouter.post('/users/', register);                               //Registration
userRouter.post('/users/login', checkUserExistsByEmail, login);     //Authentication
userRouter.get('/user', verifyToken, getCurrentUser );              //Get Current User
userRouter.put('/', );                                              //Update User

export default userRouter;