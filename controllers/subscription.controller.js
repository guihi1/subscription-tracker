import Subscription from '../models/subscription.model.js';

const getSubscriptions = async (req, res, next) => {
	try {
		const subscriptions = await Subscription.find();

		res.status(200).json({ success: true, data: subscriptions });
	} catch (error) {
		next(error);
	}
};

const getSubscriptionDetails = async (req, res, next) => {
	try {
		const subscription = await Subscription.findById(req.params.id).populate(
			'user',
		);
		if (subscription.user.id !== req.user.id) {
			const error = new Error('You do not own this subscription');
			error.status = 401;
			throw error;
		}

		res.status(200).json({ success: true, data: subscription });
	} catch (error) {
		next(error);
	}
};

const getUserSubscriptions = async (req, res, next) => {
	try {
		if (req.user.id !== req.params.id) {
			const error = new Error('You do now own this account');
			error.status = 401;
			throw error;
		}

		const subscriptions = await Subscription.find({ user: req.params.id });

		res.status(200).json({ success: true, data: subscriptions });
	} catch (error) {
		next(error);
	}
};

const createSubscription = async (req, res, next) => {
	try {
		const subscription = await Subscription.create({
			...req.body,
			user: req.user._id,
		});

		res.status(201).json({ success: true, data: subscription });
	} catch (error) {
		next(error);
	}
};

const cancelSubscription = async (req, res, next) => {
	try {
		const subscription = await Subscription.findById(req.params.id).populate(
			'user',
		);
		if (subscription.user.id !== req.user.id) {
			const error = new Error('You do not own this subscription');
			error.status = 401;
			throw error;
		}

		if (subscription.status === 'cancelled') {
			const error = new Error('Subscription already cancelled');
			error.status = 400;
			throw error;
		}

		await Subscription.findByIdAndUpdate(req.params.id, {
			status: 'cancelled',
		});
		res.status(200).json({
			success: true,
			message: 'Subscription cancelled',
		});
	} catch (error) {
		next(error);
	}
};

const deleteSubscription = async (req, res, next) => {
	try {
		const subscription = await Subscription.findById(req.params.id).populate(
			'user',
		);
		if (subscription.user.id !== req.user.id) {
			const error = new Error('You do not own this subscription');
			error.status = 401;
			throw error;
		}

		await Subscription.findByIdAndDelete(req.params.id);
		res.status(200).json({ success: true, message: 'Subscription deleted' });
	} catch (error) {
		next(error);
	}
};

export {
	getSubscriptions,
	getSubscriptionDetails,
	getUserSubscriptions,
	createSubscription,
	cancelSubscription,
	deleteSubscription,
};
