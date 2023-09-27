import User from '../Schemes/User.js';
import Subscribe from '../Schemes/Subscribe.js';
import SubscribeUser from '../Schemes/SubscribeUser.js';

export const subscribeForTarif = async (req, res) => {
    try {
        const subscribeuser = new SubscribeUser({
            user: req.user._id,
            subscribe: req.subscribe._id,
            articlesLeft: req.subscribe.articlesCount,
            monthsLeft: req.subscribe.monthsCount
        });

        subscribeuser.save();
    } catch (error) {
        console.log(error);
    }
}