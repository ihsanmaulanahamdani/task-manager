import { Router } from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validator';
import {
  createTaskSchema,
  updateTaskSchema,
  taskStatusQuerySchema,
} from '../validators';

const router = Router();

// All task routes require authentication
router.use(authenticate);

// /api/tasks - Get all tasks (with optional status filter)
router.get('/', validate(taskStatusQuerySchema, 'query'), getTasks);

// /api/tasks/:id - Get single task
router.get('/:id', getTaskById);

// /api/tasks - Create new task
router.post('/', validate(createTaskSchema), createTask);

// /api/tasks/:id - Update task
router.put('/:id', validate(updateTaskSchema), updateTask);

// /api/tasks/:id - Delete task
router.delete('/:id', deleteTask);

export default router;
