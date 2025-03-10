import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import * as subscriptionController from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', authorize, subscriptionController.getSubscriptions);

subscriptionRouter.get(
	'/:id',
	authorize,
	subscriptionController.getSubscriptionDetails,
);

subscriptionRouter.post(
	'/',
	authorize,
	subscriptionController.createSubscription,
);

subscriptionRouter.put('/:id', (req, res) => {
	res.send({ title: 'UPDATE subscription' });
});

subscriptionRouter.delete(
	'/:id',
	authorize,
	subscriptionController.deleteSubscription,
);

subscriptionRouter.get(
	'/user/:id',
	authorize,
	subscriptionController.getUserSubscriptions,
);

subscriptionRouter.put(
	'/:id/cancel',
	authorize,
	subscriptionController.cancelSubscription,
);

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
	res.send({ title: 'GET upcoming-renewals' });
});

export default subscriptionRouter;
