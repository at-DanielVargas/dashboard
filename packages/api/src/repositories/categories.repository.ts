import { HTTP_STATUS } from '../constants/http';
import { AppServiceOptions, IRepositoryResult } from '../interfaces';
import { CategoryModel, ICategory } from '../models/category.model';

export class CategoryRepository {
  public index = async (
    props: AppServiceOptions
  ): Promise<IRepositoryResult<any>> => {
    try {
      const data = await CategoryModel.paginate(
        {
          ...props.filters,
        },
        {
          customLabels: { docs: 'items', totalDocs: 'total' },
          ...props.pagination,
        }
      );
      return { error: null, data };
    } catch (error) {
      return {
        error: {
          statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
          details: error,
        },
        data: null,
      };
    }
  };
  public show = async (id: string) => {
    try {
      const data = await CategoryModel.findById(id);
      if (data) {
        return { error: null, data };
      } else {
        return {
          error: {
            status: HTTP_STATUS.NOT_FOUND,
            details: 'Not Found',
          },
          data: null,
        };
      }
    } catch (error) {
      return {
        error: {
          status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
          details: error,
        },
        data: null,
      };
    }
  };

  public create = async (data: ICategory | ICategory[]) => {
    try {
      const isManyCategories = Array.isArray(data);
      if (isManyCategories) {
        return { error: null, created: await CategoryModel.insertMany(data) };
      } else {
        return { error: null, created: await CategoryModel.create(data) };
      }
    } catch (error) {
      return { error, created: null };
    }
  };
  public update = async () => {};
  public destroy = async () => {};
}
