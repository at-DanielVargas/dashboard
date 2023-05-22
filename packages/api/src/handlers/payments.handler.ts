import { Request, Response } from 'express'
import { AppRequest } from '../interfaces'

export class PaymentsHandler {
  private repository: PaymentsRepository

  constructor() {
    this.repository = new PaymentsRepository()
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

  public update = async (req: Request, res: Response) => {
    res.json({ message: 'Hello from Sales handler update method' })
  }

  public destroy = async (req: Request, res: Response) => {
    res.json({ message: 'Hello from Sales handler destroy method' })
  }
}
