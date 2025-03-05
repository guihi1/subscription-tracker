import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';

const signUp = async (req, res, next) => {
	// Atomic operation
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const { name, email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			const error = new Error('User already exists');
			error.statusCode = 400;
			throw error;
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create(
			[{ name, email, password: hashedPassword }],
			{ session },
		);

		const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, {
			expiresIn: JWT_EXPIRES_IN,
		});

		await session.commitTransaction();
		session.endSession();

		res.status(201).json({
			success: true,
			message: 'User created successfully',
			data: { token, user: newUser[0] }, // ✅ Fixed variable name
		});
	} catch (error) {
		if (session.inTransaction()) {
			await session.abortTransaction();
		}
		session.endSession();
		next(error);
	}
};

const signIn = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			const error = new Error('User not found');
			error.statusCode = 401;
			throw error;
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			const error = new Error('Invalid credentials');
			error.statusCode = 401;
			throw error;
		}

		const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
			expiresIn: JWT_EXPIRES_IN,
		});

		res.status(200).json({
			success: true,
			message: 'User logged in successfully',
			data: { token, user },
		});
	} catch (error) {
		next(error);
	}
};

const signOut = async (req, res) => {};

export { signUp, signIn, signOut };
