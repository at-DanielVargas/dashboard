import { AppServiceOptions } from '../interfaces';
import { ProductModel } from '../models/product.model';

const getProducts = async (props: AppServiceOptions) => {
  return await ProductModel.paginate(
    {},
    {
      customLabels: { docs: 'items', totalDocs: 'total' },
      ...props.pagination,
    }
  );
};

export const getTopSellsProducts = async () => {
  try {
    return await ProductModel.find().sort({ purchases: -1 }).limit(5);
  } catch (error) {
    throw new Error('Error al obtener los productos más vendidos');
  }
};

export const ProductsService = {
  getProducts,
  getTopSellsProducts,
};
