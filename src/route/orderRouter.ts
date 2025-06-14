import { Router } from 'express';
import {
    getAllOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderById,
    getOrdersByTable,
    getOrdersByStatus,
    getOrdersByDate
} from '../controllers/orderController';

const router = Router();

router.get('/', getAllOrders);
router.post('/', createOrder);
router.patch('/:id', updateOrder);
router.delete('/:id', deleteOrder);
router.get('/table/:numberTable', getOrdersByTable);
router.get('/status/:status', getOrdersByStatus);
router.get('/date', getOrdersByDate);
router.get('/:id', getOrderById);

export default router;