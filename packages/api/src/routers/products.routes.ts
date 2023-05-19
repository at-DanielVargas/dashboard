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
    this.router.get(
      '/seed',
      [authorize(['super_admin'])],
      this.productsHandler.seed
    );
    // ruta para la busqueda de productos por nombre
    this.router.get('/q', this.productsHandler.search);
    // Ruta para la creacion de productos
    this.router.post(
      '/',
      [
        authenticate,
        authorize(['create_product', 'super_admin']),
        validateRequest(CreateProductDto),
      ],
      this.productsHandler.create
    );
    // listado de productos
    this.router.get('/', this.productsHandler.index);
    // se obtienen los productos con las mayores ventas
    this.router.get(
      '/top-products',
      [
        authenticate,
        authorize(['sales_manager', 'super_admin']),
        validateRequest(CreateProductDto),
      ],
      this.productsHandler.getTopSellsProducts
    );
    // se obtienen los datos de ganancias de las ventas totales de la plataforma
    this.router.get(
      '/revenue',
      [
        authenticate,
        authorize(['sales_manager', 'super_admin']),
        validateRequest(CreateProductDto),
      ],
      this.productsHandler.getProfit
    );
    // obtiene los datos de un producto
    this.router.get('/:id', this.productsHandler.show);
    // actualiza el producto
    this.router.put(
      '/:id',
      [
        authenticate,
        authorize(['update_product', 'super_admin']),
        validateRequest(CreateProductDto),
      ],
      this.productsHandler.update
    );
    // elimina el producto
    this.router.delete(
      '/:id',
      [
        authenticate,
        authorize(['delete_product', 'super_admin']),
        validateRequest(CreateProductDto),
      ],
      this.productsHandler.destroy
    );
    // obtiene las ganancias de un producto espesifico
    this.router.get('/:id/profit', this.productsHandler.getProfit);
  }
}
