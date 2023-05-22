import { HTTP_STATUS } from '../constants/http'
import { RepositoryResult } from '../helpers/RepositoryResult'
import { conekta } from '../helpers/conekta'
import { AppServiceOptions } from '../interfaces'
import { PaymentModel } from '../models/payments.model'
import { IProduct, ProductModel } from '../models/product.model'
import { Repository } from './Repository'

export class PaymentsRepository extends Repository<typeof PaymentModel> {
  constructor() {
    super(PaymentModel)
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
      // crear el cargo de conekta

      return new RepositoryResult(await this.model.create(product), null)
    } catch (error) {
      return new RepositoryResult(null, {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        details: error
      })
    }
  }

  public async tokenCard(cardData): Promise<RepositoryResult> {
    try {
      const connektaResponse = (await conekta('tokens')).post({ card: cardData })
      return new RepositoryResult(connektaResponse, null)
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
}
