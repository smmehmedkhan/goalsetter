import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/user.schema.js';

// Generate JWT Token
const Token = (id) => {
	const secretKey = process.env.JWT_SECRET;
	return jwt.sign({ id }, secretKey, { expiresIn: '30d' });
};

/*
  @desc: Register new user
  @route: POST /api/users
  @access: Public
*/
export const registerUser = expressAsyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Please fill in all the fields');
	}

	// Check if user exists
	const userExist = await User.findOne({ email });

	if (userExist) {
		res.status(400);
		throw new Error('User already exists.');
	}

	// Hash password with bcryptjs
	const salt = await bcrypt.genSalt(10);
	const hashedPass = await bcrypt.hash(password, salt);

	// Create new user
	const user = await User.create({
		name,
		email,
		password: hashedPass,
	});

	await user.save();

	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: Token(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

/*
  @desc: Authenticate user
  @route: POST /api/users/login
  @access: Public
*/
export const loginUser = expressAsyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// Check for valid user email & password
	const user = await User.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: Token(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid credentials');
	}
});

/*
  @desc: Display user data
  @route: GET /api/users
  @access: Private
*/
export const displayUser = expressAsyncHandler(async (req, res) => {
	const { _id, name, email } = await User.findById(req.user.id);

	res.json({ id: _id, name, email });
});
