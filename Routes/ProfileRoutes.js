import { Router } from 'express';
import { verifyToken } from '../Middleware/VerifyToken.js';
import { checkUserExistsByUsername } from '../Middleware/VerifyUser.js';
import { getProfile, followUser, unfollowUser } from '../Controllers/UserController.js';

const profileRouter = Router();

//Get Profile
profileRouter.get('/:username',
    checkUserExistsByUsername,
    getProfile
);

//Follow user
profileRouter.post('/:username/follow',
    verifyToken,
    checkUserExistsByUsername,
    followUser
);

//Unfollow user
profileRouter.delete('/:username/follow',
    verifyToken,
    checkUserExistsByUsername,
    unfollowUser
);    

export default profileRouter;