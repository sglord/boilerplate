// add password confirm field for setting PW and validate the two

import jwt from 'jsonwebtoken';
import argon from 'argon2';
import express from 'express';

import { User } from '../../database/schemas/User';

const JWT_SECRET = 'secret'; // should be in secrets or ENV_VAR

const router = express.Router();

// creates new user
export const register = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email }).lean();

		console.log('register -> user', user);

		if (user) {
			return res.status(400).send('user already exists');
		}

		const securePassword = await argon.hash(password);
		const newUser = new User({ email, password: securePassword });

		console.log('register -> newUser', newUser);

		const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
			expiresIn: 86400, // 24 hours
		});
		const payload = { newUser, token };

		try {
			const saved = await newUser.save();

			console.log('setPassword  -> success -> saved/user/payload', saved, user, payload);

			res.status(201).send(payload);
		} catch (error) {
			console.log('register -> saved ->  registraion failed', error);

			res.status(500).json({
				status: 'registraion failed',
				msg: error.message,
			});
		}
	} catch (error) {
		console.log('register -> catch error', error);
		res.status(500).send(error);
	}
};

// handle if already logged in?
export const login = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOneAndUpdate(
			{ email },
			{ lastLogin: Date.now(), $inc: { loginCount: 1 } },
			{ new: false }
		).lean();

		console.log('login -> user', user);

		if (!user) {
			return res.status(404).send('User does not exist');
		}

		const compare = await argon.verify(user.password, password);

		console.log('login -> compare', compare);

		if (compare) {
			const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 86400 });
			const payload = {
				user,
				token,
			};

			console.log('login -> success', payload);

			res.status(200).send(payload);
		}
	} catch (error) {
		console.log('login -> catch error', error);
		res.status(500).send(error);
	}
};

// change an old password to a new
export const changePassword = async (req, res, next) => {
	const { email, prevPassword, newPassword } = req.body;

	try {
		const user = await User.findOne({ email });

		console.log('changePassword -> user', user);

		if (!user) {
			return res.status(404).send('User does not exist');
		}

		const compare = await argon.verify(user.password, prevPassword);

		console.log('changePassword -> compare', compare);

		if (!compare) {
			return res.status(401).send('Unauthorized');
		}

		const securePassword = await argon.hash(newPassword);
		user.password = securePassword;

		try {
			const saved = await user.save();

			console.log('changePassword -> success -> updated/user', saved, user);

			return res.status(200).send(saved);
		} catch (error) {
			console.log('changePassword -> saved ->  password change failed', error);

			return res.status(500).json({
				status: 'password change failed',
				msg: error.message,
			});
		}
	} catch (error) {
		console.log('setPassword -> catch error', error);
		res.status(500).send(error);
	}
};

// reset password when forgotten or locked out
export const resetPassword = async (req, res, next) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });
		console.log('resetPassword -> user', user);
		if (!user) {
			// user doesn't exists, but we won't tell them that
			return res.status(200).send("If an email exists, we'll reset it");
		}

		const { password, signUpDate } = user;
		const tempSecret = `${password}-${signUpDate}`;

		/*
        email this token to the user email address
        href should be something like <site>.com/setpassword?<token> to load that page

        "Ensure that the reset password page adds the Referrer Policy tag
        with the `noreferrer` value in order to avoid referrer leakage."
        https://portswigger.net/kb/issues/00500400_cross-domain-referer-leakage

        also needs rate limiting - better through reverse proxy
        */
		const token = await jwt.sign({ id: user._id }, tempSecret, {
			expiresIn: 86400, // 24 hours
		});

		console.log('resetPassword -> token', token);

		return res.status(200).send(`If an email exists, we'll reset it - ${token}`);
	} catch (error) {
		console.log('resetPassword -> catch error', error);
		res.status(500).send(error);
	}
};

// set the password after being locked out/ resetting it
export const setPassword = async (req, res, next) => {
	const { email } = req.body;
	const { token } = req.query;

	if (!token) {
		console.log('setPassword -> no token param');

		return res.status(401).send('Unauthorized');
	}

	try {
		const user = await User.findOne({ email });

		console.log('setPassword -> user', user);

		const { password, signUpDate } = user;
		const tempSecret = `${password}-${signUpDate}`;

		const verify = await jwt.verify(token, tempSecret);

		console.log('setPassword -> verify', verify);

		if (!verify) {
			return res.status(401).send('Unauthorized');
		}

		const securePassword = await argon.hash(req.body.password);
		user.password = securePassword;

		try {
			const saved = await user.save();

			console.log('setPassword -> updated/user', saved, user);

			return res.status(200).send('password has been saved');
		} catch (error) {
			console.log('setPassword -> saved ->  password change failed', error);

			return res.status(500).json({
				status: 'password change failed',
				msg: error.message,
			});
		}
	} catch (error) {
		console.log('setPassword -> catch error', error);
		res.status(500).send(error);
	}
};

export const authenticate = async (req, res, next) => {
	if (!req.headers.authentication) {
		console.log('authenticate -> no authentication headers');

		// return res.status(400).send('Bad Request');
		return next();
	}

	const token = req.headers.authentication.replace('Bearer', '').trim();

	console.log('authenticate -> token', token);

	try {
		const verify = await jwt.verify(token, JWT_SECRET);

		console.log('authenticate -> verify', verify);

		if (!verify) {
			console.log('authenticate -> verify -> failure');

			// return res.status(401).send('Unauthorized');
		}
	} catch (error) {
		console.log('authenticate -> verify -> catch error', error);

		// return res.status(401).send('Unauthorized');
	}

	console.log('authenticate -> success');

	next();
};

router.post('/register', register);
router.post('/login', login);
router.post('/change', changePassword);
router.post('/reset', resetPassword);
router.post('/set', setPassword);

export default router;
