import { Router } from 'express';
import {
  createDriver,
  getDrivers,
  getDriver,
  updateDriver,
  deleteDriver,
} from '../controllers/driverController';

import checkRole from '../middleware/authMiddleware';

const router = Router();

router.post('/', checkRole(['Admin']), createDriver);
router.get('/', checkRole(['Admin']), getDrivers);
router.get('/:driverId', checkRole(['Admin']), getDriver);
router.put('/:driverId', checkRole(['Admin']), updateDriver);
router.delete('/:driverId', checkRole(['Admin']), deleteDriver);


export default router;