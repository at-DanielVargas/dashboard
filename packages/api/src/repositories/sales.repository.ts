import mongoose, { Schema } from 'mongoose'
import { HTTP_STATUS } from '../constants/http'
import { RepositoryResult } from '../helpers/RepositoryResult'
import { AppServiceOptions } from '../interfaces'
import { ISale, SaleModel } from '../models/sale.model'
import { Repository } from './Repository'

export class SalesRepository extends Repository<typeof SaleModel> {
  constructor() {
    super(SaleModel)
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

  public async create(sale: ISale): Promise<RepositoryResult> {
    try {
      // crea la venta,

      // crea el pago si se a completado el pago total de la venta (actualizar stock de los productos vendidos)

      return new RepositoryResult(await this.model.create(sale), null)
    } catch (error) {
      return new RepositoryResult(null, {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        details: error
      })
    }
  }

  public async show(id: string): Promise<RepositoryResult> {
    try {
      const data = await this.model.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        { $unwind: '$products' },
        {
          $lookup: {
            from: 'products',
            localField: 'products.item',
            foreignField: '_id',
            as: 'product'
          }
        },
        { $unwind: '$product' },
        {
          $group: {
            _id: '$_id',
            products: { $push: '$products' },
            total: { $sum: { $multiply: ['$product.price', '$products.quantity'] } },
            saleData: { $first: '$$ROOT' }
          }
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: ['$saleData', { total: '$total' }]
            }
          }
        }
      ])
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

  public async update(id: string, data: ISale): Promise<RepositoryResult> {
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

  public async seed(): Promise<RepositoryResult> {
    return new RepositoryResult(null, {
      statusCode: HTTP_STATUS.IM_A_TEAPOT,
      details: { message: 'wip' }
    })
  }
}
