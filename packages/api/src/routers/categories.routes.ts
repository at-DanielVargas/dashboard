import { Router } from 'express'
import { CategoriesHandler } from '../handlers/categories.handler'
import { HTTP_STATUS } from '../constants/http'
import { CategoryRepository } from '../repositories/categories.repository'
import { authenticate, authorize } from '../middlewares/authorize.middleware'
import { validateRequest } from '../middlewares/validation.middleware'
import { CreateCategoryDto } from '../models/category.model'
import { buildPermissions } from '../helpers/permissionsBuilder'
import { EModule, EPermissionAction } from '../constants/app'

export class CategoriesRouter {
  public router: Router
  private categoriesHandler: CategoriesHandler

  constructor() {
    this.router = Router()
    this.categoriesHandler = new CategoriesHandler()
    this.setupRoutes()
  }

  private setupRoutes() {
    this.router.get('/', this.categoriesHandler.index)
    this.router.get('/:id', this.categoriesHandler.show)
    this.router.post(
      '/',
      [
        authenticate,
        authorize(buildPermissions([EModule.CATEGORIES], [EPermissionAction.CREATE])),
        validateRequest(CreateCategoryDto)
      ],
      this.categoriesHandler.create
    )
    this.router.put(
      '/:id',
      [
        authenticate,
        authorize(buildPermissions([EModule.CATEGORIES], [EPermissionAction.UPDATE])),
        validateRequest(CreateCategoryDto)
      ],
      this.categoriesHandler.update
    )
    this.router.delete('/:id', [authenticate, authorize(buildPermissions([], [], true))], this.categoriesHandler.destroy)
  }
}
