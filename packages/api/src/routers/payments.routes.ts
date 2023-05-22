import { Router } from 'express'
import { validateRequest } from '../middlewares/validation.middleware'
import { CreateSaleDto } from '../models/sale.model'

export class PaymentsRouter {
  public router: Router
  private paymentsHandler: PaymentsHandler

  constructor() {
    this.router = Router()
    this.paymentsHandler = new PaymentsHandler()
    this.setupRoutes()
  }

  private setupRoutes() {
    this.router.get('/', this.paymentsHandler.index)
    this.router.post('/', [validateRequest(CreateSaleDto)], this.paymentsHandler.create)
    this.router.put('/:id', this.paymentsHandler.update)
    this.router.get('/:id', this.paymentsHandler.show)
  }
}
