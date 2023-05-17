import { AppServiceOptions } from '../interfaces';
import { OrderModel, EOrderKind } from '../models/order.model';
import axios from 'axios';
import { TrackingModel } from '../models/tracking.model';

const getOrders = async (props: AppServiceOptions) => {
  return await OrderModel.paginate(
    {
      ...props.filters,
    },
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

const track = async (id: string) => {
  const order = await OrderModel.findById(id);
  if (order.sendTracking) {
    axios
      .get(trackingServiceUrl(order.sendTracking.trackingNumber))
      .then((response) => {
        TrackingModel.updateOne(
          { _id: order.sendTracking._id },
          response.data
        ).exec();
      });
  }

  if (order.collectTracking) {
    axios
      .get(trackingServiceUrl(order.collectTracking.trackingNumber))
      .then((response) => {
        TrackingModel.updateOne(
          { _id: order.sendTracking._id },
          response.data
        ).exec();
      });
  }

  return { order };
};

const trackingServiceUrl = (id: string) => {
  return `https://seller.pakke.mx/api/v1/Shipments/tracking?trackingNumber=${id}`;
};

export const OrdersService = {
  getOrders,
  getOrder,
  getOrdersStats,
  track,
};
