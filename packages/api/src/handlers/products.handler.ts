import { Response, Request } from 'express';
import { ProductsRepository } from '../repositories/products.repository';
import { AppRequest, Handler, IRepositoryResult } from '../interfaces';

export class ProductsHandler implements Handler {
  private repository: ProductsRepository;

  constructor() {
    this.repository = new ProductsRepository();
  }
  public show = async (req: Request, res: Response) => {
    const { error, data }: IRepositoryResult = await this.repository.show(
      req.params.id
    );
    if (error) {
      res.status(error.statusCode).json(error.details);
    } else {
      res.send(data);
    }
  };

  public index = async (req: AppRequest, res: Response) => {
    const { error, data } = await this.repository.index({
      pagination: req.pagination,
      filters: { ...req.filters },
    });
    if (error) {
      res.status(error.statusCode).json(error.details);
    } else {
      res.send(data);
    }
  };

  public getTopSellsProducts = async (req: Request, res: Response) => {
    res.json(await this.repository.getTopSellsProducts());
  };

  public getProfit = async (req: Request, res: Response) => {
    res.json(await this.repository.getProfit());
  };

  public create = async (req: Request, res: Response) => {
    const { error, data } = await this.repository.create(req.body);
    if (error) {
      return res.status(error.statusCode).json({ details: error.details });
    }
    return res.send(data);
  };

  public search = async (req: AppRequest, res: Response) => {
    const { error, data } = await this.repository.search({
      pagination: req.pagination,
      filters: { ...req.filters },
      search: req.search,
    });
    if (error) {
      return res.status(error.statusCode).json({ details: error.details });
    }
    return res.send(data);
  };

  public update = async (req: Request, res: Response) => {
    const { error, data } = await this.repository.update(
      req.params.id,
      req.body
    );
    if (error) {
      return res.status(error.statusCode).json(error.details);
    }
    return res.json(data);
  };

  public destroy = async (req: Request, res: Response) => {
    const { error, data } = await this.repository.destroy(req.params.id);
    if (error) {
      return res.status(error.statusCode).json(error.details);
    }
    return res.json(data);
  };

  public seed = async (req: Request, res: Response) => {
    const { error, data } = this.repository.seed();
    if (error) {
      return res.status(error.statusCode).json(error.details);
    }
    return res.json(data);
  };
}
