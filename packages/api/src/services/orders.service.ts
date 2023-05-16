import { AppServiceOptions } from '../interfaces';
import { OrderModel, EOrderKind } from '../models/order.model';

const getOrders = async (props: AppServiceOptions) => {
  return await OrderModel.paginate(
    {},
    {
      customLabels: { docs: 'items', totalDocs: 'total' },
      ...props.pagination,
    }
  );
};

const getOrder = async (id: string) => {
  return await OrderModel.findById(id);
};

const getOrdersStats = async () => {
  try {
    const kinds = Object.values(EOrderKind);
    const counts = {};
    await Promise.all(
      kinds.map(async (kind) => {
        const count = await OrderModel.countDocuments({ kind: kind });
        counts[kind] = count;
      })
    );
    return counts;
  } catch (error) {
    throw new Error(error);
  }
};

export const OrdersService = {
  getOrders,
  getOrder,
  getOrdersStats,
};
