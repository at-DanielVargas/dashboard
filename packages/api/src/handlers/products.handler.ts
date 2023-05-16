import { Response, Request } from 'express';
import { ProductsService } from '../services/products.service';
import { AppRequest } from '../interfaces';

const getProducts = async (req: AppRequest, res: Response) => {
  res.json(await ProductsService.getProducts({ pagination: req.pagination }));
};


const getTopSellsProducts = async (req: Request, res: Response) => {
  res.json(await ProductsService.getTopSellsProducts())
}

export const ProductsHandler = {
  getProducts,
  getTopSellsProducts
};
