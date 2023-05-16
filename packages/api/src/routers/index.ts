import { Router } from 'express';
import OrdersRouter from './orders.routes';
import ProductsRouter from './products.routes';
import { PaginationMiddleware } from '../middlewares/pagination.middleware';

const ApiRouter = Router();
ApiRouter.use(PaginationMiddleware);
ApiRouter.use('/products', ProductsRouter);
ApiRouter.use('/orders', OrdersRouter);

export default ApiRouter;
