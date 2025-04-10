import mongoose from 'mongoose';

const connectToDb = async () => {
	const mongoDbUri = process.env.MONGO_URI;

	try {
		await mongoose.connect(mongoDbUri, { ssl: true, tlsInsecure: false });
		console.log('Database connected successfully');
	} catch (error) {
		console.error('Database connection error:', error);
		process.exit(1); // Exit process with failure
	}
};

export default connectToDb;
