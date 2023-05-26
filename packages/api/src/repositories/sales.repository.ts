import { EOrderKind, OrderModel } from './../models/order.model'
import { IUser } from './../models/user.model'
import mongoose, { Schema } from 'mongoose'
import { HTTP_STATUS } from '../constants/http'
import { RepositoryResult } from '../helpers/RepositoryResult'
import { AppServiceOptions } from '../interfaces'
import { ESaleStatus, ISale, SaleModel } from '../models/sale.model'
import { Repository } from './Repository'
import { IPayment, PaymentModel } from '../models/payments.model'
import { ProductModel } from '../models/product.model'

export class SalesRepository extends Repository<typeof SaleModel> {
  private ordersModel = OrderModel
  private productsModel = ProductModel
  private paymentsModel = PaymentModel
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

  public async registerPayment(saleId: string, payment: IPayment, user: IUser): Promise<RepositoryResult> {
    // TODO: implementar validacion de pagos (no se puede pagar mas de la cantidad pendiente)
    try {
      const sale = await this.model.findOne({ _id: saleId })
      const saleTotal = sale.products.reduce((acc, current) => acc + current.item.price * current.quantity * 100, 0)

      // la orden se a pagado en su totalidad
      if (saleTotal === payment.amount) {
        sale.status = ESaleStatus.PAYED

        this.ordersModel.create({
          kind: EOrderKind.COLLECT
        })
      }

      // la orden se queda pendiente
      if (saleTotal < saleTotal) {
        sale.status = ESaleStatus.PENDING
      }

      const insertedPayment = await this.paymentsModel.create({
        client: user._id,
        sale: sale._id,
        amount: payment.amount
      })
      await sale.save()
      return new RepositoryResult({ insertedPayment })
    } catch (error) {
      return new RepositoryResult(null, {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        details: error
      })
    }
  }
}
