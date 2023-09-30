import { Router } from 'express';
import { verifyToken } from '../Middleware/VerifyToken.js';
import { checkUserExistsByUsername, checkUserExistsByUsernameParam } from '../Middleware/VerifyUser.js';
import { getProfile, followUser, unfollowUser } from '../Controllers/UserController.js';

const profileRouter = Router();

//Get Profile
profileRouter.get('/:username',
    checkUserExistsByUsernameParam,
    getProfile
);

//Follow user
profileRouter.post('/:username/follow',
    verifyToken,
    checkUserExistsByUsernameParam,
    followUser
);

//Unfollow user
profileRouter.delete('/:username/follow',
    verifyToken,
    checkUserExistsByUsernameParam,
    unfollowUser
);    

export default profileRouter;