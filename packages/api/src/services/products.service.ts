import { AppServiceOptions } from '../interfaces';
import { ProductModel } from '../models/product.model';

const getProducts = async (props: AppServiceOptions) => {
  return await ProductModel.paginate(
    {},
    {
      customLabels: { docs: 'products', totalDocs: 'total' },
      ...props.pagination,
    }
  );
};

export const ProductsService = {
  getProducts,
};
