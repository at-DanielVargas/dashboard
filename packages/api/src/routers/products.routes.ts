import { Router } from 'express';
import { ProductsHandler } from '../handlers/products.handler';
import { CreateProductDto, IProduct } from '../models/product.model';
import { validateDto } from '../middlewares/validation.middleware';


const ProductsRouter = Router();
ProductsRouter.get('/', ProductsHandler.getProducts);
ProductsRouter.post(
  '/',
  validateDto<IProduct>(CreateProductDto),
  ProductsHandler.createProduct
);
ProductsRouter.get('/top-sells', ProductsHandler.getTopSellsProducts);
ProductsRouter.get('/profit', ProductsHandler.getProfit);

export default ProductsRouter;
