import express from 'express';
import { allUsers, login, profile, register } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, profile);
router.get('/users', protect, adminOnly, allUsers);

export default router;
