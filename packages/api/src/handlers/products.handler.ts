import { Response, Request } from 'express';
import { ProductsService } from '../services/products.service';
import { AppRequest } from '../interfaces';

const getProducts = async (req: AppRequest, res: Response) => {
  res.json(
    await ProductsService.getProducts({
      pagination: req.pagination,
      filters: { ...req.filters }
    })
  );
};

const getTopSellsProducts = async (req: Request, res: Response) => {
  res.json(await ProductsService.getTopSellsProducts());
};

const getProfit = async (req: Request, res: Response) => {
  res.json(await ProductsService.getProfit());
};

export const ProductsHandler = {
  getProducts,
  getTopSellsProducts,
  getProfit,
};
