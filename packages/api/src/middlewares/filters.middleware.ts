import { NextFunction, Response } from 'express';
import { AppRequest } from '../interfaces';
import {
  createNestedObject,
  excludeProperties,
} from '../helpers/getObjectFromqueryParam';

export const FiltersMiddleware = (
  req: AppRequest,
  res: Response,
  next: NextFunction
) => {
  req.filters = req.query
    ? {
        ...excludeProperties(
          createNestedObject(req.query as Record<string, string>),
          ['page', 'limit']
        ),
      }
    : {};
  next();
};
