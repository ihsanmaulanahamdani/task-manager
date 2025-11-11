import { Router } from 'express';
import authRoutes from './authRoutes';
import taskRoutes from './taskRoutes';

const router = Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Task Manager API is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;
