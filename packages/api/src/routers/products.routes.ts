import { Router } from 'express';
import { ProductsHandler } from '../handlers/products.handler';
import { validateRequest } from '../middlewares/validation.middleware';
import { CreateProductDto } from '../models/product.model';
import { authenticate, authorize } from '../middlewares/authorize.middleware';

export class ProductsRouter {
  public router: Router;
  private productsHandler: ProductsHandler;

  constructor() {
    this.router = Router();
    this.productsHandler = new ProductsHandler();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.post(
      '/',
      [
        authenticate,
        authorize(['create_product', 'super_admin']),
        validateRequest(CreateProductDto),
      ],
      this.productsHandler.create
    );
    this.router.get('/', this.productsHandler.index);
    this.router.get('/best', this.productsHandler.getTopSellsProducts);
    this.router.get('/total-profit', this.productsHandler.getProfit);
    this.router.get('/:id', this.productsHandler.show);
    this.router.put(
      '/:id',
      [
        authenticate,
        authorize(['update_product', 'super_admin']),
        validateRequest(CreateProductDto),
      ],
      this.productsHandler.update
    );
    this.router.delete(
      '/:id',
      [
        authenticate,
        authorize(['delete_product', 'super_admin']),
        validateRequest(CreateProductDto),
      ],
      this.productsHandler.destroy
    );
    this.router.get('/:id/profit', this.productsHandler.getProfit);
  }
}
