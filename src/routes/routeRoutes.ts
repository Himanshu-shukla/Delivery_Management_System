import { Router, RequestHandler } from 'express';
import { createRoute, getRoutes, getRoute, updateRoute, deleteRoute } from '../controllers/routeController';
import  checkRole  from '../middleware/authMiddleware';

const router = Router();

router.post('/', checkRole(['Admin', 'Driver']) as RequestHandler, createRoute as RequestHandler);
router.get('/', checkRole(['Admin', 'Driver']) as RequestHandler, getRoutes as RequestHandler);
router.get('/:routeId', checkRole(['Admin', 'Driver']) as RequestHandler, getRoute as RequestHandler);
router.put('/:routeId', checkRole(['Admin', 'Driver']) as RequestHandler, updateRoute as RequestHandler);
router.delete('/:routeId', checkRole(['Admin', 'Driver']) as RequestHandler, deleteRoute as RequestHandler);

export default router;