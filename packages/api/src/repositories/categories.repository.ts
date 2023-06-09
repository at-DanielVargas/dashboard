import { HTTP_STATUS } from '../constants/http'
import { RepositoryResult } from '../helpers/RepositoryResult'
import { AppServiceOptions } from '../interfaces'
import { CategoryModel, ICategory } from '../models/category.model'
import { Repository } from './Repository'

export class CategoryRepository extends Repository<typeof CategoryModel> {
  constructor() {
    super(CategoryModel)
  }

  public index = async (props: AppServiceOptions): Promise<RepositoryResult> => {
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

  public show = async (id: string): Promise<RepositoryResult> => {
    try {
      const data = await this.model.findById(id)
      if (!data) {
        return new RepositoryResult(null, {
          statusCode: HTTP_STATUS.NOT_FOUND,
          details: 'Not Found'
        })
      }
      return new RepositoryResult(data)
    } catch (error) {
      return new RepositoryResult(null, {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        details: error
      })
    }
  }

  public create = async (data: ICategory | ICategory[]): Promise<RepositoryResult> => {
    try {
      const categories = Array.isArray(data) ? [...data] : [data]
      return new RepositoryResult(await this.model.insertMany(categories))
    } catch (error) {
      return new RepositoryResult(null, {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        details: error
      })
    }
  }
  public update = async (id: string, data): Promise<RepositoryResult> => {
    try {
      return new RepositoryResult(await this.model.findByIdAndUpdate(id, { $set: data }, { new: true }))
    } catch (error) {
      return new RepositoryResult(null, {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        details: error
      })
    }
  }
  public destroy = async (id: string) => {
    try {
      return new RepositoryResult(await this.model.deleteOne({ _id: id }, { new: true }))
    } catch (error) {
      return new RepositoryResult(null, {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        details: error
      })
    }
  }
}
