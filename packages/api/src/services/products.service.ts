import { AppServiceOptions } from '../interfaces';
import { ProductModel } from '../models/product.model';

const getProducts = async (props: AppServiceOptions) => {
  return await ProductModel.paginate(
    {
      ...props.filters,
    },
    {
      customLabels: { docs: 'items', totalDocs: 'total' },
      ...props.pagination,
    }
  );
};

const getTopSellsProducts = async () => {
  try {
    return await ProductModel.find().sort({ purchases: -1 }).limit(5);
  } catch (error) {
    throw new Error('Error al obtener los productos más vendidos');
  }
};

const getProfit = async () => {
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
};

export const ProductsService = {
  getProducts,
  getTopSellsProducts,
  getProfit,
};
