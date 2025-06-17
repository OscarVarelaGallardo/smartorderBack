
import { Router } from 'express';
import {
    createSubscription,
    getAllSubscriptions,
    getSubscriptionById,
    updateSubscription,
    deleteSubscription

} from '../controllers/suscriptionController';

const router = Router();

router.post('/', createSubscription);

router.get('/', getAllSubscriptions);

router.get('/:id',  getSubscriptionById);

router.patch('/:id', updateSubscription);

router.delete('/:id', deleteSubscription);

export default router;