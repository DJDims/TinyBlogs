import User from '../Schemes/User.js';

export const checkUserExistsByUsername = async (req, res, next) => {
    const user = await User.getUserByUsername(req.body.user.username);
    if (!user) return res.status(404).send({ error: 'User not found' });
    next();
}

export const checkUserExistsByEmail = async (req, res, next) => {
    const user = await User.getUserByEmail(req.body.user.email);
    if (!user) return res.status(404).send({ error: 'User not found' });
    next();
}

export const checkDuplicateUsername = async (req, res, next) => {
    const user = await User.getUserByUsername(req.body.user.username);
    if (user) return res.status(400).send({ error: 'Username already taken' });
    next();
}

export const checkDuplicateEmail = async (req, res, next) => {
    const user = await User.getUserByEmail(req.body.user.email);
    if (user) return res.status(400).send({ error: 'Email already taken' });
    next();
}