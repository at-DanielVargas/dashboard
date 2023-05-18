import 'reflect-metadata';
// import 'express-async-errors';
import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { ApiRouter } from './routers/index';
import mongoose from 'mongoose';
// import { ProductModel } from './models/product.model';
// import { categories, orders, products, tracking, users } from './seed';
// import { CategoryModel } from './models/category.model';
// import { EOrderKind, OrderItemModel, OrderModel } from './models/order.model';
// import { UserModel } from './models/user.model';
// import { faker } from '@faker-js/faker';
// import { TrackingModel } from './models/tracking.model';
// import axios from 'axios';

// const app: Application = express();

// app.use('/api/v1', ApiRouter);

// app.get('/seed', async (req, res) => {
//   const insertedUsers = await UserModel.insertMany(users);
//
//   const insertedProducts = new Promise((resolve, reject) => {
//     insertedCategories.map(async (category) => {
//       await ProductModel.insertMany(
//         products(
//           faker.helpers.rangeToNumber({ min: 1, max: 10 }),
//           String(category._id)
//         )
//       );
//     });
//   });

//   Promise.all([insertedUsers, insertedCategories, insertedProducts]).then(
//     ([users, categories, products]) => {
//       res.json({ users, categories, products });
//     }
//   );

//   // CategoryModel.insertMany(categories(6)).then((insertedCategories) => {
//   //   insertedCategories.forEach((category) => {
//   //     ProductModel.insertMany(products(8, String(category._id))).then(
//   //       (insertedProducts) => {
//   //         insertedUsers.forEach((user) => {
//   //           OrderModel.insertMany(
//   //             orders(faker.number.int({ min: 1, max: 3 }), String(user._id))
//   //           ).then((insertedOrders) => {
//   //             insertedOrders.forEach((userOrder) => {
//   //               const orderProducts = faker.helpers
//   //                 .arrayElements(
//   //                   insertedProducts,
//   //                   faker.number.int({ min: 1, max: 3 })
//   //                 )
//   //                 .map((product) => ({
//   //                   item: product._id,
//   //                   quantity: faker.number.int({ min: 1, max: 2 }),
//   //                 }));

//   //               OrderItemModel.insertMany(orderProducts).then(
//   //                 (insertedOrderItemProduct) => {
//   //                   OrderModel.findOneAndUpdate(
//   //                     { _id: userOrder._id },
//   //                     {
//   //                       items: insertedOrderItemProduct.map((o) =>
//   //                         String(o._id)
//   //                       ),
//   //                     }
//   //                   ).exec();
//   //                 }
//   //               );

//   //               if (
//   //                 [EOrderKind.REFUND, EOrderKind.CANCELLATION].includes(
//   //                   userOrder.kind as EOrderKind
//   //                 )
//   //               ) {
//   //                 const collectTracking = new TrackingModel({
//   //                   ...tracking(),
//   //                 });
//   //                 collectTracking.save().then((insertedCollectTracking) => {
//   //                   OrderModel.findOneAndUpdate(
//   //                     { _id: userOrder._id },
//   //                     { collectTracking: insertedCollectTracking._id }
//   //                   ).exec();
//   //                 });
//   //               }

//   //               // if ([EOrderKind.SALE].includes(userOrder.kind as EOrderKind)) {
//   //               //   const collectTracking = new TrackingModel({
//   //               //     ...tracking(),
//   //               //   });
//   //               //   const sendTracking = new TrackingModel({
//   //               //     ...tracking(),
//   //               //   });

//   //               //   sendTracking.save().then((insertedSendTracking) => {
//   //               //     OrderModel.findOneAndUpdate(
//   //               //       { _id: userOrder._id },
//   //               //       { sendTracking: insertedSendTracking._id }
//   //               //     ).exec();
//   //               //   });

//   //               //   collectTracking.save().then((insertedCollectTracking) => {
//   //               //     OrderModel.findOneAndUpdate(
//   //               //       { _id: userOrder._id },
//   //               //       { collectTracking: insertedCollectTracking._id }
//   //               //     ).exec();
//   //               //   });
//   //               // }
//   //               OrderModel.findOneAndUpdate(
//   //                 { _id: userOrder._id },
//   //                 userOrder
//   //               ).exec();
//   //             });
//   //           });
//   //         });
//   //       }
//   //     );
//   //   });
//   // });
//   // res.send('Database seeded succesfully');
// });

// app.get('/mldata', async (req, res) => {
//   const limit = 50;
//   const url = `https://api.mercadolibre.com/sites/MLM/search?seller_id=210292439`;

//   const mlResponse = await axios.get(url);

//   const {
//     results,
//     paging: { total },
//   } = mlResponse.data;

//   // Promise.all

//   const links = Array.from(
//     { length: Math.ceil(Number(total) / limit) },
//     (_, index) => {
//       return `https://api.mercadolibre.com/sites/MLM/search?seller_id=210292439&offset=${
//         index * limit
//       }`;
//     }
//   );

//   Promise.all(
//     links.map((link) => axios.get(link).then((response) => response.data))
//   ).then((data) => {
//     const products = data.reduce(
//       (acc, current) => [...acc, ...current.results],
//       []
//     );

//     const categories = data[0]?.available_filters
//       .filter((f) => f.id === 'category')
//       .reduce((acc, current) => [...acc, ...current.values], []);

//     res.json({
//       products: products.map(
//         ({
//           id,
//           title,
//           price,
//           original_price,
//           inventory_id,
//           category_id,
//           thumbnail,
//           sold_quantity,
//           available_quantity,
//         }) => ({
//           id,
//           title,
//           price,
//           original_price,
//           inventory_id,
//           category_id,
//           thumbnail,
//           sold_quantity,
//           available_quantity,
//         })
//       ),
//       categories,
//     });
//   });
// });

//     app.listen(port, host, () => {
//       console.log(`[ ready ] http://${host}:${port}`);
//     });
//   });
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;
class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.setupRouters();
  }

  private config() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
    this.app.use(cors());
  }

  private setupRouters() {
    const apiRouter = new ApiRouter();
    this.app.use('/api/v1', apiRouter.router);
  }

  public start(port: number, host: string): void {
    mongoose
      .connect(
        'mongodb://dev:root@localhost:27017/?retryWrites=true&w=majority',
        {
          dbName: 'ecommerce',
        }
      )
      .then(() => {
        this.app.listen(port, host, () => {
          console.log(`[ ready ] http://${host}:${port}`);
        });
      });
  }
}

const server = new App();
server.start(port, host);
