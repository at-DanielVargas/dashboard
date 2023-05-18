import { Router } from 'express';
import { SalesHandler } from '../handlers/sales.handler';

export class SalesRouter {
  public router: Router;
  private salesHandler: SalesHandler;

  constructor() {
    this.router = Router();
    this.salesHandler = new SalesHandler();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.get('/', this.salesHandler.index);
  }
}
