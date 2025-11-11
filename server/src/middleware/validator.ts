import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export const validate = (
  schema: Schema,
  property: 'body' | 'query' | 'params' = 'body'
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      res.status(400).json({
        message: errors.map((detail) => detail).join(', '),
        errors,
      });
      return;
    }

    next();
  };
};
