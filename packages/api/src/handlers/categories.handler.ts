import { Request, Response } from 'express';
import { AppRequest } from '../interfaces';
import { CategoryRepository } from '../repositories/categories.repository';

export class CategoriesHandler {
  private repository: CategoryRepository;

  constructor() {
    this.repository = new CategoryRepository();
  }

  public index = async (req: AppRequest, res: Response) => {
    res.json(
      await this.repository.index({
        pagination: req.pagination,
        filters: { ...req.filters },
      })
    );
  };

  public show = async (req: Request, res: Response) => {
    const { error, data } = await this.repository.show(req.params.id);
    if (error) {
      res.status(error.http).json(error.details);
    } else {
      res.json(data);
    }
  };

  public create = async (req: Request, res: Response) => {
    const {error, created} = await this.repository.create(req.body)
    res.json({ message: 'Hello from categories handler create method' });
  };

  public update = async (req: Request, res: Response) => {
    res.json({ message: 'Hello from categories handler update method' });
  };

  public destroy = async (req: Request, res: Response) => {
    res.json({ message: 'Hello from categories handler destroy method' });
  };
}
