import { Router } from 'express';
import { PaginationMiddleware } from '../middlewares/pagination.middleware';
import { FiltersMiddleware } from '../middlewares/filters.middleware';
import { ProductsRouter } from './products.routes';
import { OrdersRouter } from './orders.routes';
import { SalesRouter } from './sales.routes';
import { CategoriesRouter } from './categories.routes';

export class ApiRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.use(PaginationMiddleware);
    this.router.use(FiltersMiddleware);

    this.router.use((err, req, res, next) => {
      console.log('errrrrrrrrrrrrrrrror perra');
      res.status(418);
      res.json({ error: err.message });
      next(err);
    });

    const productsRouter = new ProductsRouter();
    const ordersRouter = new OrdersRouter();
    const salesRouter = new SalesRouter();
    const categoriesRouter = new CategoriesRouter();

    this.router.use('/products', productsRouter.router);
    this.router.use('/orders', ordersRouter.router);
    this.router.use('/sales', salesRouter.router);
    this.router.use('/categories', categoriesRouter.router);
  }
}
