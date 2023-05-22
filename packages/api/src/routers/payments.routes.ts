import { Router } from 'express'
import { validateRequest } from '../middlewares/validation.middleware'
import { CreateSaleDto } from '../models/sale.model'
import { PaymentsHandler } from '../handlers/payments.handler'
import { CreateCardTokenDto, CreatePaymentDto } from '../models/payments.model'
import { authenticate } from '../middlewares/authorize.middleware'
import { authorize } from '../middlewares/authorize.middleware'
import { buildPermissions } from '../helpers/permissionsBuilder'
import { EModule, EPermissionAction } from '../constants/app'

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
    this.router.post('/', [validateRequest(CreatePaymentDto)], this.paymentsHandler.create)
    this.router.post(
      '/card-token',
      [
        authenticate,
        authorize(buildPermissions([EModule.PAYMENTS], [EPermissionAction.CREATE])),
        validateRequest(CreateCardTokenDto)
      ],
      this.paymentsHandler.cardToken
    )
    this.router.get('/:id', this.paymentsHandler.show)
  }
}
