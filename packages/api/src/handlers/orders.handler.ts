import { Request, Response } from 'express';
import { OrdersRepository } from '../repositories/orders.repository';
import { AppRequest } from '../interfaces';

export class OrdersHandler {
  private repository: OrdersRepository;

  constructor() {
    this.repository = new OrdersRepository();
  }

  public getOrders = async (req: AppRequest, res: Response) => {
    res.json(
      await this.repository.getOrders({
        pagination: req.pagination,
        filters: { ...req.filters },
      })
    );
  };

  public getOrder = async (req: Request, res: Response) => {
    res.json(await this.repository.getOrder(req.params.orderId));
  };

  public getOrdersStats = async (req: Request, res: Response) => {
    res.json(await this.repository.getOrdersStats());
  };

  public track = async (req: Request, res: Response) => {
    res.json(await this.repository.track(req.params.orderId));
  };

  public getOrdersWithTracking = async (req: AppRequest, res: Response) => {
    res.json(
      await this.repository.getOrdersWithTracking({
        pagination: req.pagination,
        filters: { ...req.filters },
      })
    );
  };
}
