import { Response } from 'express';
import { Task } from '../models';
import { AuthRequest } from '../middleware/auth';
import { TaskStatus } from '../models/Task';

export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const { status } = req.query;

    const whereClause: any = {
      userId: req.user.id,
    };

    // Add status filter if provided
    if (status) {
      whereClause.status = status as TaskStatus;
    }

    const tasks = await Task.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({ tasks });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
};

export const getTaskById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const { id } = req.params;

    const task = await Task.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.status(200).json({ task });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ message: 'Server error while fetching task' });
  }
};

export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description,
      status: status || 'to do',
      userId: req.user.id,
    });

    res.status(201).json({ task });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Server error while creating task' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await Task.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    // Update fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    await task.save();

    res.status(200).json({ task });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Server error while updating task' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const { id } = req.params;

    const task = await Task.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    await task.destroy();

    res.status(204).send();
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Server error while deleting task' });
  }
};
