/* eslint-disable camelcase */
import jwt from 'passport-jwt';

import { UserSchema as User } from '../../database/schemas';

const opts = {};
opts.jwtFromRequest = jwt.ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret'; // this should be an actual secret or key, probably argon key

export default passport => {
	passport.use(
		new jwt.Strategy(opts, (jwt_payload, done) => {
			User.findById(jwt_payload.id)
				.then(user => {
					if (user) {
						return done(null, user);
					}
					return done(null, false);
				})
				.catch(err => console.log(err));
		})
	);
};
