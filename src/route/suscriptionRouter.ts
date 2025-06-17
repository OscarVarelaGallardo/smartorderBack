
import { Router } from 'express';
import {
    createSubscription,
    getAllSubscriptions,
    getSubscriptionById,
    updateSubscription,
    deleteSubscription

} from '../controllers/suscriptionController';

const router = Router();
// Create a new subscription
router.post('/', createSubscription);
// Get all subscriptions
router.get('/', getAllSubscriptions);

router.get('/:id',  getSubscriptionById);
// Update a subscription by ID
router.patch('/:id', updateSubscription);

router.delete('/:id', deleteSubscription);

export default router;