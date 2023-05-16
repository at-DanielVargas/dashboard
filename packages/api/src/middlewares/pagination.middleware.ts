import { NextFunction, Response } from 'express';
import { AppRequest } from '../interfaces';

export const PaginationMiddleware = (
  req: AppRequest,
  res: Response,
  next: NextFunction
) => {
  const defaultLimit = 10;
  const defaultPage = 1;
  const { page = defaultPage, limit = defaultLimit } = req.query;
  req.pagination = {
    page: Number(page),
    limit: Number(limit),
  };
  next();
};
