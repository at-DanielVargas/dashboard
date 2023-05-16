import { Response } from 'express';
import { ProductsService } from '../services/products.service';
import { AppRequest } from '../interfaces';

const getProducts = async (req: AppRequest, res: Response) => {
  res.json(await ProductsService.getProducts({ pagination: req.pagination }));
};

export const ProductsHandler = {
  getProducts,
};
