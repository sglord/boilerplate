import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
	name: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	signUpDate: {
		type: Date,
		default: Date.now,
	},
	lastLogin: {
		type: Date,
		default: Date.now(),
		required: true,
	},
	loginCount: {
		default: 0,
		type: Number,
	},
});

export const User = mongoose.model('User', UserSchema);
