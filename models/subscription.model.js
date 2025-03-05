import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Subscription name is required'],
			trim: true,
			minLength: 2,
			maxLength: 100,
		},
		price: {
			type: Number,
			required: [true, 'Subscription price is required'],
			min: [0, 'Price must be greater than 0'],
		},
		currency: {
			type: String,
			default: 'BRL',
			enum: ['BRL', 'USD', 'EUR'],
		},
		frequency: {
			type: String,
			required: [true, 'Subscription frequency is required'],
			enum: ['daily', 'weekly', 'monthly', 'yearly'],
		},
		category: {
			type: String,
			required: [true, 'Subscription category is required'],
			enum: ['entertainment', 'health', 'services', 'sports', 'technology'],
		},
		paymentMethod: {
			type: String,
			required: [true, 'Payment method is required'],
		},
		status: {
			type: String,
			default: 'active',
			enum: ['active', 'cancelled', 'expired'],
		},
		startDate: {
			type: Date,
			required: true,
			validate: {
				validator: (value) => value <= new Date(),
				message: 'Start date must be in the past',
			},
		},
		renewalDate: {
			type: Date,
			required: true,
			validate: {
				validator: function (value) {
					return value > this.startDate;
				},
				message: 'Renewal date must be after the start date',
			},
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			index: true,
		},
	},
	{ timestamps: true },
);

subscription.Schema.pre('save', function (next) {
	if (!this.renewalDate) {
		const renewalPeriod = {
			daily: 1,
			weekly: 7,
			monthly: 30,
			yearly: 365,
		};
		this.renewalDate = new Date(this.startDate);
		this.renewalDate.setDate(
			this.renewalDate.getDate() + renewalPeriod[this.frequency],
		);

		if (this.renewalDate < new Date()) {
			this.status = 'expired';
		}
	}
	next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
