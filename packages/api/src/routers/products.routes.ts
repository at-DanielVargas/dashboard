import { Router } from 'express';
import { ProductsHandler } from '../handlers/products.handler';

const ProductsRouter = Router();

ProductsRouter.get('/', ProductsHandler.getProducts);

export default ProductsRouter;
