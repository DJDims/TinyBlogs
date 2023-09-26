import { Router } from 'express';
import { verifyToken } from '../Middleware/VerifyToken.js';
import { checkUserExistsByUsername } from '../Middleware/VerifyUser.js';
import { getProfile, followUser, unfollowUser } from '../Controllers/UserController.js';

const profileRouter = Router();

profileRouter.get('/:username', checkUserExistsByUsername, getProfile);    //Get Profile

profileRouter.post('/:username/follow', verifyToken, checkUserExistsByUsername, followUser);      //Follow user

profileRouter.delete('/:username/follow', verifyToken, checkUserExistsByUsername, unfollowUser);    //Unfollow user

export default profileRouter;