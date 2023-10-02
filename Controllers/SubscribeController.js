import User from '../Schemes/User.js';
import Subscribe from '../Schemes/Subscribe.js';
import SubscribeUser from '../Schemes/SubscribeUser.js';

export const subscribeForTarif = async (req, res) => {
    try {
        const subscribeuser = await SubscribeUser.findByUserId(req.user._id);
        await subscribeuser.setSubscribe(req.subscribe);
        res.send("Succesfully subscribed");
    } catch (error) {
        console.log(error);
    }
}

export const getSubscribes = async (req, res) => {
    try {
        const subscribes = await Subscribe.findAll()
        res.json(subscribes);
    } catch (error) {
        console.log(error);
    }
}