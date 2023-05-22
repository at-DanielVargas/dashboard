import { HTTP_STATUS } from '../constants/http'
import { RepositoryResult } from '../helpers/RepositoryResult'
import { AppServiceOptions } from '../interfaces'
import { IProduct, ProductModel } from '../models/product.model'
import { Repository } from './Repository'

export class ProductsRepository extends Repository<typeof ProductModel> {
  constructor() {
    super(ProductModel)
  }

  public async index(props: AppServiceOptions): Promise<RepositoryResult> {
    try {
      const data = await this.model.paginate(
        {
          ...props.filters
        },
        {
          customLabels: { docs: 'items', totalDocs: 'total' },
          ...props.pagination
        }
      )
      return new RepositoryResult(data)
    } catch (error) {
      return new RepositoryResult(null, {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        details: error
      })
    }
  }

  public async create(product: IProduct): Promise<RepositoryResult> {
    try {
      return new RepositoryResult(await this.model.create(product), null)
    } catch (error) {
      return new RepositoryResult(null, {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        details: error
      })
    }
  }

  public async show(id: string): Promise<RepositoryResult> {
    try {
      const data = await this.model.findById(id)
      if (data) {
        return new RepositoryResult(data)
      } else {
        return new RepositoryResult(null, {
          statusCode: HTTP_STATUS.NOT_FOUND,
          details: 'Not found'
        })
      }
    } catch (error) {
      return new RepositoryResult(null, {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        details: error
      })
    }
  }

  public async update(id: string, data: IProduct): Promise<RepositoryResult> {
    try {
      return new RepositoryResult(await this.model.findByIdAndUpdate(id, { $set: data }, { new: true }))
    } catch (error) {
      return new RepositoryResult(null, {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        details: error
      })
    }
  }

  public async destroy(id: string): Promise<RepositoryResult> {
    try {
      return new RepositoryResult(await this.model.deleteOne({ _id: id }, { new: true }))
    } catch (error) {
      return new RepositoryResult(null, {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        details: error
      })
    }
  }

  public async getTopSellsProducts() {
    try {
      return await this.model.find().sort({ purchases: -1 }).limit(5)
    } catch (error) {
      throw new Error('Error al obtener los productos más vendidos')
    }
  }

  public async getProfit() {
    try {
      const result = await this.model.aggregate([
        {
          $group: {
            _id: null,
            totalProductSales: { $sum: '$purchases' },
            totalInProductSells: {
              $sum: { $multiply: ['$price', '$purchases'] }
            },
            totalProductsProfit: {
              $sum: {
                $multiply: [{ $subtract: ['$price', '$supplierPrice'] }, '$purchases']
              }
            }
          }
        }
      ])

      return {
        ...result[0]
      }
    } catch (error) {
      throw new Error('Error al obtener los datos de ganancias')
    }
  }

  public async search(props: AppServiceOptions) {
    const reguex = new RegExp('.*' + props.search + '.*', 'i')
    try {
      const data = await this.model.paginate(
        {
          ...props.filters,
          name: reguex
        },
        {
          select: 'name',
          customLabels: { docs: 'items', totalDocs: 'total' },
          ...props.pagination
        }
      )
      return new RepositoryResult(data)
    } catch (error) {
      return new RepositoryResult(null, {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        details: error
      })
    }
  }

  public async seed(): Promise<RepositoryResult> {
    return new RepositoryResult(null, {
      statusCode: HTTP_STATUS.IM_A_TEAPOT,
      details: { message: 'wip' }
    })
  }
}
