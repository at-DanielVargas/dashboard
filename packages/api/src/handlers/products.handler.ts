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
    res.json(
      await this.repository.index({
        pagination: req.pagination,
        filters: { ...req.filters },
      })
    );
  };

  public getTopSellsProducts = async (req: Request, res: Response) => {
    res.json(await this.repository.getTopSellsProducts());
  };

  public getProfit = async (req: Request, res: Response) => {
    res.json(await this.repository.getProfit());
  };

  public create = async (req: Request, res: Response) => {
    const {error, data} = await this.repository.create(req.body);

    if (error) {
      res.status
    } else {

    }

    res.send('asdfasd');
  };

  public update = async (req: Request, res: Response) => {
    res.send();
  };

  public destroy = async (req: Request, res: Response) => {
    res.send();
  };
}
