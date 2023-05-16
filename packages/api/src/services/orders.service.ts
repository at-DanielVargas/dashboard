import { AppServiceOptions } from '../interfaces';
import { OrderModel } from '../models/order.model';

const getOrders = async (props: AppServiceOptions) => {
  return await OrderModel.paginate(
    {},
    {
      customLabels: { docs: 'orders', totalDocs: 'total' },
      ...props.pagination,
    }
  );
};

const getOrder = async (id: string) => {
  return await OrderModel.findById(id);
};

export const OrdersService = {
  getOrders,
  getOrder,
};
