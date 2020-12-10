import mongoose from 'mongoose';
import { DATABASE_URI } from '../../../secrets';

const dbConnect = async () => {
	await mongoose.connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
		if (err) {
			console.log('Database connection error');
		} else {
			console.log('Connected to database');
		}
	});

	const database = mongoose.connection;

	database.on('connected', () => {
		console.log('connected to MongoDB');
	});
	database.on('error', () => {
		console.log('error connecting to mongoDB');
	});
	database.on('disconnected', () => {
		console.log('disconnected from mongoDB');
	});
};

export default dbConnect;
