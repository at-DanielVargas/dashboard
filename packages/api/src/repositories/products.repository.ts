import { HTTP_STATUS } from '../constants/http';
import { RepositoryResult } from '../helpers/RepositoryResult';
import { AppServiceOptions, IRepositoryResult } from '../interfaces';
import { IProduct, ProductModel } from '../models/product.model';

export class ProductsRepository {
  public async index(props: AppServiceOptions) {
    return await ProductModel.paginate(
      {
        ...props.filters,
      },
      {
        customLabels: { docs: 'items', totalDocs: 'total' },
        ...props.pagination,
      }
    );
  }

  public async create(product): Promise<RepositoryResult> {
    try {
      return new RepositoryResult(await ProductModel.create(product), null);
    } catch (error) {
      return new RepositoryResult(null, {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        details: error,
      });
    }
  }

  public async show(id: string): Promise<RepositoryResult> {
    try {
      const data = await ProductModel.findById(id);
      if (!data) {
        return new RepositoryResult(data);
      } else {
        return new RepositoryResult(null, {
          statusCode: HTTP_STATUS.NOT_FOUND,
          details: 'Not found',
        });
      }
    } catch (error) {
      return new RepositoryResult(null, {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        details: error,
      });
    }
  }

  public async getTopSellsProducts() {
    try {
      return await ProductModel.find().sort({ purchases: -1 }).limit(5);
    } catch (error) {
      throw new Error('Error al obtener los productos más vendidos');
    }
  }

  public async getProfit() {
    try {
      const result = await ProductModel.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: '$purchases' },
            totalSells: { $sum: { $multiply: ['$price', '$purchases'] } },
            totalProfit: {
              $sum: {
                $multiply: [
                  { $subtract: ['$price', '$supplierPrice'] },
                  '$purchases',
                ],
              },
            },
          },
        },
      ]);

      return {
        ...result[0],
      };
    } catch (error) {
      throw new Error('Error al obtener los datos de ganancias');
    }
  }
}
