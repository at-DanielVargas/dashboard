import { Router } from 'express'
import { SalesHandler } from '../handlers/sales.handler'
import { validateRequest } from '../middlewares/validation.middleware'
import { CreateSaleDto } from '../models/sale.model'

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
    this.router.put('/:id', this.salesHandler.update)
    this.router.get('/:id', this.salesHandler.show)
  }
}
