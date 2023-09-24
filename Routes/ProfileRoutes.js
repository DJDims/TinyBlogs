import { Router } from 'express';
import { verifyToken } from '../Middleware/VerifyToken.js';
import { getProfile, followUser, unfollowUser } from '../Controllers/UserController.js';

const profileRouter = Router();

profileRouter.get('/:username', getProfile);    //Get Profile

profileRouter.post('/:username/follow', verifyToken, followUser);      //Follow user

profileRouter.delete('/:username/follow', verifyToken, unfollowUser);    //Unfollow user

export default profileRouter;