import { Router } from 'express';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
	res.send({ title: 'GET subscriptions' });
});

subscriptionRouter.get('/:id', (req, res) => {
	res.send({ title: 'GET subscription details' });
});

subscriptionRouter.post('/', (req, res) => {
	res.send({ title: 'CREATE subscription' });
});

subscriptionRouter.put('/:id', (req, res) => {
	res.send({ title: 'UPDATE subscription' });
});

subscriptionRouter.delete('/:id', (req, res) => {
	res.send({ title: 'DELETE subscriptions' });
});

subscriptionRouter.get('/user/:id', (req, res) => {
	res.send({ title: 'GET subscriptions from a user' });
});

subscriptionRouter.put('/:id/cancel', (req, res) => {
	res.send({ title: 'CANCEl subscription' });
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
	res.send({ title: 'GET upcoming-renewals' });
});

export default subscriptionRouter;
