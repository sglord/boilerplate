import mongoose from 'mongoose';

const URI = 'fill in your db endpoint here';

const dbConnect = async () => {
	await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
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
