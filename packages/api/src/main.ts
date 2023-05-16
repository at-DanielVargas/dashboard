import 'reflect-metadata';
import express, { Application } from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import ApiRouter from './routers/index';
import mongoose from 'mongoose';
import { ProductModel } from './models/product.model';
import { categories, orders, products, tracking, users } from './seed';
import { CategoryModel } from './models/category.model';
import { EOrderKind, OrderItemModel, OrderModel } from './models/order.model';
import { UserModel } from './models/user.model';
import { faker } from '@faker-js/faker';
import { TrackingModel } from './models/tracking.model';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

const app: Application = express();
app.use(morgan('dev'));
app.use(cors());

app.use('/api/v1', ApiRouter);

app.get('/seed', async (req, res) => {
  const insertedUsers = await UserModel.insertMany(users);

  CategoryModel.insertMany(categories(30)).then((insertedCategories) => {
    insertedCategories.forEach((category) => {
      ProductModel.insertMany(products(15, String(category._id))).then(
        (insertedProducts) => {
          insertedUsers.forEach((user) => {
            OrderModel.insertMany(
              orders(faker.number.int({ min: 1, max: 6 }), String(user._id))
            ).then((insertedOrders) => {
              insertedOrders.forEach((userOrder) => {
                const orderProducts = faker.helpers
                  .arrayElements(
                    insertedProducts,
                    faker.number.int({ min: 1, max: 8 })
                  )
                  .map((product) => ({
                    item: product._id,
                    quantity: faker.number.int({ min: 1, max: 6 }),
                  }));

                OrderItemModel.insertMany(orderProducts).then(
                  (insertedOrderItemProduct) => {
                    OrderModel.findOneAndUpdate(
                      { _id: userOrder._id },
                      {
                        items: insertedOrderItemProduct.map((o) =>
                          String(o._id)
                        ),
                      }
                    ).exec();
                  }
                );

                if (
                  [EOrderKind.REFUND, EOrderKind.CANCELLATION].includes(
                    userOrder.kind as EOrderKind
                  )
                ) {
                  const collectTracking = new TrackingModel({
                    ...tracking(),
                  });
                  collectTracking.save().then((insertedCollectTracking) => {
                    OrderModel.findOneAndUpdate(
                      { _id: userOrder._id },
                      { collectTracking: insertedCollectTracking._id }
                    ).exec();
                  });
                }

                if ([EOrderKind.SALE].includes(userOrder.kind as EOrderKind)) {
                  const collectTracking = new TrackingModel({
                    ...tracking(),
                  });
                  const sendTracking = new TrackingModel({
                    ...tracking(),
                  });

                  sendTracking.save().then((insertedSendTracking) => {
                    OrderModel.findOneAndUpdate(
                      { _id: userOrder._id },
                      { sendTracking: insertedSendTracking._id }
                    ).exec();
                  });

                  collectTracking.save().then((insertedCollectTracking) => {
                    OrderModel.findOneAndUpdate(
                      { _id: userOrder._id },
                      { collectTracking: insertedCollectTracking._id }
                    ).exec();
                  });
                }
                OrderModel.findOneAndUpdate(
                  { _id: userOrder._id },
                  userOrder
                ).exec();
              });
            });
          });
        }
      );
    });
  });
  res.send('Database seeded succesfully');
});


app.use((err, req, res, next) => {
  if (err.message === 'access denied') {
    res.status(403);
    res.json({ error: err.message });
  }
  next(err);
});

mongoose
  .connect('mongodb://dev:root@localhost:27017/?retryWrites=true&w=majority', {
    dbName: 'ecommerce',
  })
  .then(() => {
    app.listen(port, host, () => {
      console.log(`[ ready ] http://${host}:${port}`);
    });
  });
