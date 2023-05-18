import { Request, Response } from 'express';

export class SalesHandler {
  public index = async (req: Request, res: Response) => {
    res.json({ message: 'Hello from Sales handler index method' });
  };

  public show = async (req: Request, res: Response) => {
    res.json({ message: 'Hello from Sales handler show method' });
  };

  public create = async (req: Request, res: Response) => {
    res.json({ message: 'Hello from Sales handler create method' });
  };

  public update = async (req: Request, res: Response) => {
    res.json({ message: 'Hello from Sales handler update method' });
  };

  public destroy = async (req: Request, res: Response) => {
    res.json({ message: 'Hello from Sales handler destroy method' });
  };
}
