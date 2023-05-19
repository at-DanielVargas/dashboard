import { Router } from 'express';
import { CategoriesHandler } from '../handlers/categories.handler';
import { categories } from '../seed';
import { HTTP_STATUS } from '../constants/http';
import { CategoryRepository } from '../repositories/categories.repository';
import { authenticate, authorize } from '../middlewares/authorize.middleware';
import { validateRequest } from '../middlewares/validation.middleware';
import { CreateCategoryDto } from '../models/category.model';

export class CategoriesRouter {
  public router: Router;
  private categoriesHandler: CategoriesHandler;

  constructor() {
    this.router = Router();
    this.categoriesHandler = new CategoriesHandler();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.get('/', this.categoriesHandler.index);
    this.router.get('/seed', authorize(['super_admin']), async (req, res) => {
      const cr = new CategoryRepository();
      const { error, data } = await cr.create(categories(30));
      if (error) {
        res.status(HTTP_STATUS.IM_A_TEAPOT).json({ error });
        return;
      }
      res.json(data);
    });
    this.router.get('/:id', this.categoriesHandler.show);
    this.router.post(
      '/',
      [
        authenticate,
        authorize(['create_category', 'super_admin']),
        validateRequest(CreateCategoryDto),
      ],
      this.categoriesHandler.create
    );
    this.router.put(
      '/:id',
      [
        authenticate,
        authorize(['manage_category', 'super_admin']),
        validateRequest(CreateCategoryDto),
      ],
      this.categoriesHandler.update
    );
    this.router.delete(
      '/:id',
      [authenticate, authorize(['admin', 'super_admin'])],
      this.categoriesHandler.destroy
    );
  }
}
