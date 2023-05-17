import { Router } from 'express';
import { OrdersHandler } from '../handlers/orders.handler';

const OrdersRouter = Router();

OrdersRouter.get('/', OrdersHandler.getOrders);
OrdersRouter.get('/stats', OrdersHandler.getOrdersStats);
OrdersRouter.get('/with-tracking', OrdersHandler.getOrdersWithTracking);
OrdersRouter.get('/:orderId', OrdersHandler.getOrder);
OrdersRouter.get('/:orderId/tracking', OrdersHandler.track);

export default OrdersRouter;
