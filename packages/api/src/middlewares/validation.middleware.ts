import { Request, Response, NextFunction } from 'express';
import { Schema } from 'yup';
import { HTTP_STATUS } from '../constants/http';

export const validateRequest = (schema: Schema<any>) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await schema.validate(req.body, { strict: true });
      next();
    } catch (error) {
      res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
        error: {
          type: 'Validation',
          details: error.errors,
        },
      });
    }
  };
};
