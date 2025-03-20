import express from 'express';
import { updateUser } from '../controllers/user.controller.js';
import { getUsers } from '../controllers/user.controller.js';
import { protect } from '../middleware/authMiddleware.js';
import { getBalance } from '../controllers/user.controller.js';
import { transferMoney } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', protect, getUsers);
router.put('/update', protect, updateUser);

router.get('/balance', protect, getBalance);
router.post('/transfer', protect, transferMoney);

export default router;
