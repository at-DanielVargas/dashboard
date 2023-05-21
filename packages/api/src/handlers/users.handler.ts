import { Request, Response } from 'express'

export class UsersHandler {
  public index = async (req: Request, res: Response) => {
    res.json({ message: 'Hello from Users handler index method' })
  }

  public show = async (req: Request, res: Response) => {
    res.json({ message: 'Hello from Users handler show method' })
  }

  public create = async (req: Request, res: Response) => {
    res.json({ message: 'Hello from Users handler create method' })
  }

  public update = async (req: Request, res: Response) => {
    res.json({ message: 'Hello from Users handler update method' })
  }

  public destroy = async (req: Request, res: Response) => {
    res.json({ message: 'Hello from Users handler destroy method' })
  }
}
