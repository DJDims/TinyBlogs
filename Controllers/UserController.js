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
		res.status(200).send('Registration Successful');
	} catch (error) {
		res.status(422).json({ error: error });
	}
}

export const login = async (req, res) => {
	try {
		const user = await User.getUserByEmail(req.body.user.email);
		const match = await bcrypt.compare(req.body.user.password, user.password);
		if (!match) return res.status(401).send('Wrong Password');
		
		const userId = user.id;
		const username = user.username;
		const email = user.email;

		const accessToken = jsonwebtoken.sign({ userId, username, email },
			process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: '15m',
		});

		res.send(accessToken);
	} catch (error) {
		res.status(404).json({ error: error });
	}
}

export const getCurrentUser = async (req, res) => {
    try {
		const user = req.user;
		res.status(200).json({ user }); 
	} catch (error) {
		res.status(422).json({ error: error });
	}
}

export const updateUser = async (req, res) => {
	try {
		await req.user.update(req.body.user);
        res.status(200).send("User successfully updated"); 
    } catch (error) {
        res.status(422).send(error);
    }
}

export const getProfile = async (req, res) => {
	try {
        const user = req.user;
        res.status(200).json({ user }); 
    } catch (error) {
        res.status(422).json({ error: error });
    }
}

export const followUser = async (req, res) => {
	try {
		const user = await User.getUserByUsername(req.params.username);
		if (req.user.userId === user._id) return res.status(403).send('You cannot follow yourself');

		if (req.user.isFollowing(user._id)) return res.status(403).send('You already following this user');
		await req.user.follow(user._id);

		res.status(200).send('Successfully followed!');
	} catch (error) {
		res.status(422).json({ error: error });
	}
}

export const unfollowUser = async (req, res) => {
	try {
		const user = await User.getUserByUsername(req.params.username);
		if (req.user.userId === user._id) return res.status(403).send('You cannot unfollow yourself');

		if (!req.user.isFollowing(user._id)) return res.status(403).send('You are not following this user');
		await req.user.unfollow(user._id);

		res.status(200).send('Successfully unfollowed!');
	} catch (error) {
		res.status(422).json({ error: error });
	}
}