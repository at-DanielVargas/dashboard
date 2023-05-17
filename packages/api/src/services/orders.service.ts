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

  let sendTrackingPromise: Promise<any>;
  let collectTrackingPromise: Promise<any>;

  if (order && order.sendTracking) {
    sendTrackingPromise = axios
      .get(trackingServiceUrl(order.sendTracking.trackingNumber))
      .then((response) => {
        TrackingModel.updateOne(
          { _id: order.sendTracking._id },
          {
            $set: {
              ...response.data[0],
              TrackingNumber: order.sendTracking.TrackingNumber,
            },
          }
        ).exec();
      });
  }

  if (order && order.collectTracking) {
    collectTrackingPromise = axios
      .get(trackingServiceUrl(order.collectTracking.trackingNumber))
      .then((response) => {
        TrackingModel.updateOne(
          { _id: order.collectTracking._id },
          {
            $set: {
              ...response.data[0],
              TrackingNumber: order.collectTracking.TrackingNumber,
            },
          }
        ).exec();
      });
  }

  return await Promise.all([sendTrackingPromise, collectTrackingPromise]).then(
    () => {
      return OrderModel.findById(id);
    }
  );
};

const getOrdersWithTracking = async (props: AppServiceOptions) => {
  return await OrderModel.paginate(
    {
      ...props.filters,
      collectTracking: {}
    },
    {
      customLabels: { docs: 'items', totalDocs: 'total' },
      ...props.pagination,
    }
  );
};

const trackingServiceUrl = (id: string) => {
  return `https://seller.pakke.mx/api/v1/Shipments/tracking?trackingNumber=${id}`;
};

export const OrdersService = {
  getOrders,
  getOrder,
  getOrdersStats,
  track,
  getOrdersWithTracking,
};
