import { Router } from 'express'
import { OrdersHandler } from '../handlers/orders.handler'

export class OrdersRouter {
  public router: Router
  private ordersHandler: OrdersHandler

  constructor() {
    this.router = Router()
    this.ordersHandler = new OrdersHandler()
    this.setupRoutes()
  }

  private setupRoutes() {
    this.router.get('/', this.ordersHandler.getOrders)
    this.router.get('/stats', this.ordersHandler.getOrdersStats)
    this.router.get('/with-tracking', this.ordersHandler.getOrdersWithTracking)
    this.router.get('/:orderId/tracking', this.ordersHandler.track)
    this.router.get('/:orderId', this.ordersHandler.getOrder)
  }
}
