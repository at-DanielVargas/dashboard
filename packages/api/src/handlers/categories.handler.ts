import { Request, Response } from 'express'
import { AppRequest } from '../interfaces'
import { CategoryRepository } from '../repositories/categories.repository'

export class CategoriesHandler {
  private repository: CategoryRepository

  constructor() {
    this.repository = new CategoryRepository()
  }

  public index = async (req: AppRequest, res: Response) => {
    const { error, data } = await this.repository.index({
      pagination: req.pagination,
      filters: { ...req.filters }
    })
    if (error) {
      return res.status(error.statusCode).json({ error: error.details })
    }
    return res.json(data)
  }

  public show = async (req: Request, res: Response) => {
    const { error, data } = await this.repository.show(req.params.id)
    if (error) {
      return res.status(error.statusCode).json(error.details)
    }
    return res.json(data)
  }

  public create = async (req: Request, res: Response) => {
    const { error, data } = await this.repository.create(req.body)
    if (error) {
      return res.status(error.statusCode).json(error.details)
    } else {
      return res.json(data)
    }
  }

  public update = async (req: Request, res: Response) => {
    const { error, data } = await this.repository.update(req.params.id, req.body)
    if (error) {
      return res.status(error.statusCode).json(error.details)
    }
    return res.json(data)
  }

  public destroy = async (req: Request, res: Response) => {
    const { error, data } = await this.repository.destroy(req.params.id)
    if (error) {
      return res.status(error.statusCode).json(error.details)
    }
    return res.json(data)
  }
}
