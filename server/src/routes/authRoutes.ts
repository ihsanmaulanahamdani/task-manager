import { Router } from 'express';
import { register, login, logout } from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validator';
import { registerSchema, loginSchema } from '../validators';

const router = Router();

// /api/auth/register - Register new user
router.post('/register', validate(registerSchema), register);

// /api/auth/login - Login user
router.post('/login', validate(loginSchema), login);

// /api/auth/logout - Logout user (requires authentication)
router.post('/logout', authenticate, logout);

// /api/auth/me - Get current user (requires authentication)

export default router;
