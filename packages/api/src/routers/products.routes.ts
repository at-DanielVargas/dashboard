import { Router } from 'express';
import { ProductsHandler } from '../handlers/products.handler';

const ProductsRouter = Router();
ProductsRouter.get('/', ProductsHandler.getProducts);
ProductsRouter.get('/top-sells', ProductsHandler.getTopSellsProducts);
ProductsRouter.get('/profit', ProductsHandler.getProfit)

export default ProductsRouter;
