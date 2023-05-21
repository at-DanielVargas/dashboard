import { Router } from 'express'
import { AuthHandler } from '../handlers/auth.handler'
import { validateRequest } from '../middlewares/validation.middleware'
import { CreateUserDto } from '../models/user.model'

export class AuthRouter {
  public router: Router
  private authHandler: AuthHandler

  constructor() {
    this.router = Router()
    this.authHandler = new AuthHandler()
    this.setupRoutes()
  }

  private setupRoutes() {
    this.router.post('/register', [validateRequest(CreateUserDto)], this.authHandler.register)
    this.router.post('/authorize', this.authHandler.authorize)
    this.router.post('/refresh', this.authHandler.refresh)
    this.router.get('/confirm', this.authHandler.confirm)
    this.router.post('/recovery', this.authHandler.recovery)
  }
}
