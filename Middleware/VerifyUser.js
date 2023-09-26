import User from '../Schemes/User.js';

export const checkUserExistsByUsername = async (req, res, next) => {
    const user = await User.getUserByUsername(req.params.username);
    if (!user) return res.status(404).send({ error: 'User not found' });
    next();
}

export const checkUserExistsByEmail = async (req, res, next) => {
    const user = await User.getUserByEmail(req.params.body.email);
    if (!user) return res.status(404).send({ error: 'User not found' });
    next();
}