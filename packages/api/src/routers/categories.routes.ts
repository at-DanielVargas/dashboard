import { Router } from 'express';
import { CategoriesHandler } from '../handlers/categories.handler';
import { categories } from '../seed';
import { HTTP_STATUS } from '../constants/http';
import { CategoryRepository } from '../repositories/categories.repository';
import { authorize } from '../middlewares/authorize.middleware';

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
      const { error, created } = await cr.create(categories(30));
      if (error) {
        res.status(HTTP_STATUS.IM_A_TEAPOT).json({ error });
        return;
      }
      res.json(created);
    });
    this.router.get('/:id', this.categoriesHandler.show);
    this.router.post(
      '/',
      authorize(['create_category']),
      this.categoriesHandler.create
    );
    this.router.put(
      '/:id',
      authorize(['manage_category']),
      this.categoriesHandler.update
    );
    this.router.delete(
      '/:id',
      authorize(['admin']),
      this.categoriesHandler.destroy
    );
  }
}
