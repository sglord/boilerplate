// add password confirm field for setting PW and validate the two

import jwt from 'jsonwebtoken';
import argon from 'argon2';

import { User } from '../../database/schemas/User';

const JWT_SECRET = 'secret'; // should be in secrets or ENV_VAR

export const validateUserFields = async (req, res, next) => {
	console.log('validating fields');
	res.locals.isValidated = true;
	return next();
};

// creates new user
export const register = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email }).lean();

		console.log('register -> user', user);

		if (user) {
			console.log('register -> user already exists');

			return res.status(400).send({ message: 'user already exists' });
		}

		const securePassword = await argon.hash(password);
		const newUser = new User({ email, password: securePassword });

		console.log('register -> newUser', newUser);

		const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
			expiresIn: 86400, // 24 hours
		});
		const payload = { user: newUser, token };

		try {
			const saved = await newUser.save();

			console.log('setPassword  -> success -> saved/user/payload', saved, user, payload);

			return res.status(201).send(payload);
		} catch (error) {
			console.log('register -> saved ->  registraion failed', error);

			return res.status(500).json({
				status: 'registraion failed',
				msg: error.message,
			});
		}
	} catch (error) {
		console.log('register -> catch error', error);

		return res.status(500).send(error);
	}
};

// logs a user in
// need to handle if token already exists
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

		if (!compare) {
			console.log('login -> compare -> failure');

			return res.status(401).send('Unauthorized');
		}

		console.log('login -> compare -> success');

		const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 86400 });
		const payload = {
			user,
			token,
		};

		console.log('login -> success', payload);

		return res.status(200).send(payload);
	} catch (error) {
		console.log('login -> catch error', error);

		return res.status(500).send(error);
	}
};

// is serverside logout even needed? Maybe deserialize user via passport
export const logout = async (req, res, next) => {
	return next();
};

// change an old password to a new
export const changePassword = async (req, res, next) => {
	const { email, prevPassword, newPassword } = req.body;

	try {
		const user = await User.findOne({ email });

		console.log('changePassword -> user', user);

		if (!user) {
			console.log('changePassword -> user does not exist');

			return res.status(404).send('User does not exist');
		}

		const compare = await argon.verify(user.password, prevPassword);

		console.log('changePassword -> compare', compare);

		if (!compare) {
			console.log('changePassword -> compare -> failure');

			return res.status(401).send('Unauthorized');
		}

		console.log('changePassword -> compare -> success');

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
		console.log('changePassword -> catch error', error);

		return res.status(500).send(error);
	}
};

// reset password when forgotten or locked out
// need to disable the password too!
export const resetPassword = async (req, res, next) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });

		console.log('resetPassword -> user', user);

		if (!user) {
			// user doesn't exists, but we won't tell them that
			console.log('resetPassword -> user -> user does not exist', email);

			return res.status(200).send("If an email exists, we'll reset it");
		}

		const { password, signUpDate } = user;
		const tempSecret = `${password}-${signUpDate}`;

		console.log('resetPassword -> tempSecret', tempSecret);

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

		// return res.status(200).send(`If an email exists, we'll reset it`);
		return res.status(200).send({ message: `If an email exists, we'll reset it`, token });
	} catch (error) {
		console.log('resetPassword -> catch error', error);

		return res.status(500).send(error);
	}
};

// set the password after being locked out/ resetting it
export const setPassword = async (req, res, next) => {
	const { email } = req.body;
	const { token } = req.query;

	console.log('setPassword -> token', token);

	if (!token) {
		console.log('setPassword -> no token param');

		return res.status(401).send('Unauthorized');
	}

	try {
		const user = await User.findOne({ email });

		console.log('setPassword -> user', user);

		const { password, signUpDate } = user;
		const tempSecret = `${password}-${signUpDate}`;

		console.log('setPassword -> tempSecret', tempSecret);

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

		return res.status(500).send(error);
	}
};

// checks if user is currently in a valid session
// need to update and refresh the token
export const authenticate = async (req, res, next) => {
	console.log('authenticate -> headers', req.headers);

	if (!req.headers.authorization) {
		console.log('authenticate -> no authorization headers');

		return res.status(400).send('Bad Request');
	}

	const token = req.headers.authorization.replace('Bearer', '').trim();

	console.log('authenticate -> token', token);

	try {
		const verify = await jwt.verify(token, JWT_SECRET);

		console.log('authenticate -> verify', verify);

		if (!verify) {
			console.log('authenticate -> verify -> failure');

			return res.status(401).send('Unauthorized');
		}
	} catch (error) {
		console.log('authenticate -> verify -> catch error', error.message);

		return res.status(401).send(`Unauthorized ${error.message}`);
	}

	console.log('authenticate -> success');

	return next();
};
