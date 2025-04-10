import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv/config';

import goalRoutes from './routes/goals.route.js';
import userRoutes from './routes/users.route.js';
import { errorHandler } from './middlewares/errorHandler.js';
import connectToDb from './config/db.js';

const port = process.env.PORT || 8080;
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route paths
app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);

// Error handler
app.use(errorHandler);

const server = async () => {
	try {
		await connectToDb();
		console.log('Connected to MongoDB'.green);

    // Start the server
		app.listen(port, () => {
			console.log(`Server listening on http://localhost:${port}`);
		});
	} catch (error) {
		console.error(`Error: ${error.message}`.red);
		process.exit(1);
	}
};

server();
