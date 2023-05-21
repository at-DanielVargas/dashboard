import { Request, Response } from 'express'
import { SalesRepository } from '../repositories/sales.repository'

export class SalesHandler {

  private repository: SalesRepository

  constructor() {
    this.repository = new SalesRepository()
  }

  public index = async (req: Request, res: Response) => {
    res.json({ message: 'Hello from Sales handler index method' })
  }

  public show = async (req: Request, res: Response) => {
    res.json({ message: 'Hello from Sales handler show method' })
  }

  public create = async (req: Request, res: Response) => {
    res.json({ message: 'Hello from Sales handler create method' })
  }

  public update = async (req: Request, res: Response) => {
    res.json({ message: 'Hello from Sales handler update method' })
  }

  public destroy = async (req: Request, res: Response) => {
    res.json({ message: 'Hello from Sales handler destroy method' })
  }
}
