import { Router } from 'express';
import { OrdersHandler } from '../handlers/orders.handler';

const OrdersRouter = Router();

OrdersRouter.get('/', OrdersHandler.getOrders);
OrdersRouter.get('/:orderId', OrdersHandler.getOrder);

export default OrdersRouter;
