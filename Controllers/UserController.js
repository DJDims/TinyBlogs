import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../Schemes/User.js";

export const register = async (req, res) => {
    const { username, email, password } = req.body.user;
	const hashPassword = await bcrypt.hash(password, 8);
	
	try {
		const user = new User({
			username: username, 
			email: email, 
			password: hashPassword
		});
		await user.save();
		res.send({ message: 'Registration Successful' });
	} catch (error) {
		res.status(422).send({ error: error });
	}
}

export const login = async (req, res) => {
	try {
		const user = await User.findOne({email: req.body.user.email});
		const match = await bcrypt.compare(req.body.user.password, user.password);
		if (!match) return res.status(401).send({ error: 'Wrong Password' });
		
		const userId = user.id;
		const username = user.username;
		const email = user.email;

		const accessToken = jsonwebtoken.sign({ userId, username, email },
			process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: '15m',
		});
		const refreshToken = jsonwebtoken.sign({ userId, username, email },
			process.env.REFRESH_TOKEN_SECRET, {
			expiresIn: '1d',
		});

		await User.updateOne({_id: userId},{ refreshtoken: refreshToken });
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
		});
		res.send({ token: accessToken });
	} catch (error) {
		res.status(404).json({ error: error });
	}
}

export const getCurrentUser = async (req, res) => {
    try {
		const token = req.headers["x-access-token"];
		const userId = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET);
		const user = await User.findById(userId.userId);
		res.status(200).send({ user }); 
	} catch (error) {
		res.status(422).json({ error: error });
	}
}

export const updateUser = async (req, res) => {
	res.send({ message: 'Not implemented yet. Update User' });
}

export const getProfile = async (req, res) => {
	try {
        const username = req.params.username;
        const user = await User.findOne({username: username});
		if (!user) return res.status(404).send({ error: 'User not found' });
        res.status(200).send({ user }); 
    } catch (error) {
        res.status(422).json({ error: error });
    }
}

export const followUser = async (req, res) => {
	try {
		const username = req.params.username;
		const token = req.headers["x-access-token"];
		const thisUser = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET);
		if (thisUser.username === username) return res.status(403).send({ error: 'You cannot follow yourself' });

		const user = await User.findOne({username: username});
		if (!user) return res.status(404).send({ error: 'User not found' });
		if (user.followers.includes(thisUser.userId)) return res.status(403).send({ error: 'You already followed this user' });
		user.followers.push(thisUser.userId);
		await user.save();
		res.status(200).send({ message: 'Successfully followed!' });
	} catch (error) {
		res.status(422).json({ error: error });
	}
}

export const unfollowUser = async (req, res) => {
	try {
		const username = req.params.username;
		const token = req.headers["x-access-token"];
		const thisUser = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET);
		if (thisUser.username === username) return res.status(403).send({ error: 'You cannot unfollow yourself' });

		const user = await User.findOne({username: username});
		if (!user) return res.status(404).send({ error: 'User not found' });
		if (!user.followers.includes(thisUser.userId)) return res.status(403).send({ error: 'You already unfollowed this user' });
		user.followers.splice(user.followers.indexOf(thisUser.userId), 1);
		await user.save();
		res.status(200).send({ message: 'Successfully unfollowed!' });
	} catch (error) {
		res.status(422).json({ error: error });
	}
}