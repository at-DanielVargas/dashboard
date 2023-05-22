import { Router } from 'express'
import { SalesHandler } from '../handlers/sales.handler'
import { validateRequest } from '../middlewares/validation.middleware'
import { CreateSaleDto } from '../models/sale.model'
import { CreatePaymentDto } from '../models/payments.model'
import { authenticate } from '../middlewares/authorize.middleware'

export class SalesRouter {
  public router: Router
  private salesHandler: SalesHandler

  constructor() {
    this.router = Router()
    this.salesHandler = new SalesHandler()
    this.setupRoutes()
  }

  private setupRoutes() {
    this.router.get('/', this.salesHandler.index)
    this.router.post('/', [validateRequest(CreateSaleDto)], this.salesHandler.create)
    this.router.post('/:id/register-payment', [authenticate, validateRequest(CreatePaymentDto)], this.salesHandler.registerPayment)
    this.router.get('/:id', this.salesHandler.show)
  }
}
