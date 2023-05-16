import { Request, Response } from 'express';
import { OrdersService } from '../services/orders.service';
import { AppRequest } from '../interfaces';

const getOrders = async (req: AppRequest, res: Response) => {
  res.json(await OrdersService.getOrders({ pagination: req.pagination }));
};

const getOrder = async (req: Request, res: Response) => {
  res.json(await OrdersService.getOrder(req.params.orderId));
};

const getOrdersStats = async (req: Request, res: Response) => {
  res.json(await OrdersService.getOrdersStats());
};

const track = async (req: Request, res: Response) => {
  res.json(await OrdersService.track());
};

export const OrdersHandler = {
  getOrders,
  getOrder,
  getOrdersStats,
  track,
};
