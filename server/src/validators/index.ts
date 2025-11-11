import Joi from 'joi';

// Auth Validation Schemas
export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'Password is required',
  }),
  name: Joi.string().min(2).max(50).optional().messages({
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name must not exceed 50 characters',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
  }),
});

// Task Validation Schemas
export const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    'string.min': 'Task title must be at least 3 characters',
    'string.max': 'Task title must not exceed 100 characters',
    'any.required': 'Task title is required',
  }),
  description: Joi.string().max(500).required().messages({
    'string.max': 'Task description must not exceed 500 characters',
    'any.required': 'Task description is required',
  }),
  status: Joi.string()
    .valid('to_do', 'in_progress', 'done')
    .required()
    .messages({
      'any.only': 'Status must be one of: to_do, in_progress, done',
      'any.required': 'Task status is required',
    }),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional().messages({
    'string.min': 'Task title must be at least 3 characters',
    'string.max': 'Task title must not exceed 100 characters',
  }),
  description: Joi.string().max(500).optional().messages({
    'string.max': 'Task description must not exceed 500 characters',
  }),
  status: Joi.string()
    .valid('to_do', 'in_progress', 'done')
    .optional()
    .messages({
      'any.only': 'Status must be one of: to_do, in_progress, done',
    }),
})
  .min(1)
  .messages({
    'object.min': 'At least one field must be provided for update',
  });

export const taskStatusQuerySchema = Joi.object({
  status: Joi.string()
    .valid('to_do', 'in_progress', 'done')
    .optional()
    .messages({
      'any.only': 'Status must be one of: to_do, in_progress, done',
    }),
});
