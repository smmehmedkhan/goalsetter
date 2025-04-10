import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/user.schema.js';

export const protect = expressAsyncHandler(async (req, res, next) => {
	const secretKey = process.env.JWT_SECRET;
	const bearer = req.headers.authorization?.startsWith('Bearer');
	let token;

	if (req.headers.authorization && bearer) {
		try {
			// Get token from header
			token = req.headers.authorization.split(' ')[1];

			// Verify token
			const decoded = jwt.verify(token, secretKey);

			// Get user from the token
			req.user = await User.findById(decoded.id).select('-password');

			next();
		} catch (error) {
			console.error(error);
			res.status(401);
			throw new Error('Not Authorized');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('Not Authorized, no token');
	}
});
