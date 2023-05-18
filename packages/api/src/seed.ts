import { faker } from '@faker-js/faker/locale/es_MX';
import { hashSync } from 'bcrypt';
import { ICategory } from './models/category.model';
import { IProduct } from './models/product.model';
import { IUser } from './models/user.model';
import { EOrderKind, EOrderStatus, IOrder } from './models/order.model';
import { ITracking } from './models/tracking.model';
import { trackings } from './trackings';
import { mldata } from './mlmock';

export const categories = (numOfCategories: number) =>
  new Array<ICategory>(numOfCategories)
    .fill({ name: '', description: '' })
    .map(() => ({
      name: faker.commerce.productAdjective(),
      description: faker.lorem.lines(),
    }));

export const products = (numOfProducts: number, productCategory: string) =>
  new Array<IProduct>(numOfProducts)
    .fill({
      name: '',
      description: '',
      sku: '',
      price: 0,
      stock: 0,
      supplierPrice: 0,
      purchases: 0,
    })
    .map((product, index) => {
      const price = mldata.products[index].price;
      return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        sku: faker.string.nanoid(6).toUpperCase(),
        price,
        supplierPrice: Number(faker.finance.amount(10, price, 0)),
        purchases: faker.helpers.rangeToNumber({ min: 1, max: 17 }),
        stock: faker.helpers.rangeToNumber({ min: 1, max: 1785 }),
        category: productCategory,
      };
    });

export const users = new Array<IUser>(20)
  .fill({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  })
  .map(() => {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    return {
      firstname,
      lastname,
      email: faker.internet.email({
        firstName: firstname,
        lastName: lastname,
        provider: 'mailinator.com',
      }),
      password: hashSync('dev_123456!', 8),
    };
  });

export const orders = (numOfOrders: number, clientId: string) =>
  new Array<IOrder>(numOfOrders)
    .fill({
      kind: '',
      status: '',
      sendTracking: '',
      collectTracking: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .map(() => {
      return {
        kind: faker.helpers.arrayElement(Object.values(EOrderKind)),
        status: faker.helpers.arrayElement(Object.values(EOrderStatus)),
        client: clientId,
        createdAt: faker.date.between({
          from: '2020-01-01T00:00:00.000Z',
          to: '2023-05-14T00:00:00.000Z',
        }),
      };
    });

export const tracking = (): Partial<ITracking> => ({
  TrackingNumber: String(faker.helpers.arrayElement(trackings)),
});
