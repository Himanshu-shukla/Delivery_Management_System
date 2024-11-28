import { Router } from 'express';
import { createOrder, getOrders, getOrder, updateOrder, deleteOrder } from '../controllers/orderController';
import checkRole from '../middleware/authMiddleware';

const router = Router();

router.post('/', checkRole(['Admin', 'Driver']), createOrder);

router.get('/:orderId', checkRole(['Admin', 'Driver']), getOrder);

router.get('/', checkRole(['Admin', 'Driver']), getOrders);

router.put('/:orderId', checkRole(['Admin', 'Driver']), updateOrder);

router.delete('/:orderId', checkRole(['Admin', 'Driver']), deleteOrder);

export default router;