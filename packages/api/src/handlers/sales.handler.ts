import { Request, Response } from 'express'
import { SalesRepository } from '../repositories/sales.repository'
import { AppRequest } from '../interfaces'

export class SalesHandler {
  private repository: SalesRepository

  constructor() {
    this.repository = new SalesRepository()
  }

  public index = async (req: AppRequest, res: Response) => {
    const { error, data } = await this.repository.index({
      pagination: req.pagination,
      filters: { ...req.filters }
    })
    if (error) {
      res.status(error.statusCode).json(error.details)
    } else {
      res.send(data)
    }
  }

  public show = async (req: Request, res: Response) => {
    const { error, data } = await this.repository.show(req.params.id)
    if (error) {
      res.status(error.statusCode).json(error.details)
    } else {
      res.send(data)
    }
  }

  public create = async (req: Request, res: Response) => {
    const { error, data } = await this.repository.create(req.body)
    if (error) {
      return res.status(error.statusCode).json({ details: error.details })
    }
    return res.send(data)
  }

  public registerPayment = async (req: AppRequest, res: Response) => {
    const { error, data } = await this.repository.registerPayment(req.params.id, req.body, req.user)
    if (error) {
      return res.status(error.statusCode).json({ details: error.details })
    }
    return res.send(data)
  }
}
