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
  new Array<ICategory>(mldata.categories.length)
    .fill({ name: '', description: '' })
    .map((c, index) => ({
      name: mldata.categories[index].name,
      description: faker.commerce.productAdjective(),
    }));

export const products = (numOfProducts: number, productCategory: string) =>
  new Array<IProduct>(mldata.products.length)
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
        name: mldata.products[index].title,
        description: faker.commerce.productDescription(),
        sku:
          mldata.products[index].inventory_id ||
          faker.string.nanoid(6).toUpperCase(),
        price: mldata.products[index].price,
        supplierPrice: Number(faker.finance.amount(10, price, 0)),
        purchases: mldata.products[index].sold_quantity,
        stock: mldata.products[index].available_quantity,
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
      items: [],
      status: '',
      client: '',
      sendTracking: '',
      collectTracking: '',
      created_at: new Date(),
      updated_at: new Date(),
    })
    .map(() => {
      return {
        kind: faker.helpers.arrayElement(Object.values(EOrderKind)),
        status: faker.helpers.arrayElement(Object.values(EOrderStatus)),
        client: clientId,
        created_at: faker.date.between({
          from: '2020-01-01T00:00:00.000Z',
          to: '2023-05-14T00:00:00.000Z',
        }),
      };
    });

export const tracking = (): Partial<ITracking> => ({
  TrackingNumber: String(faker.helpers.arrayElement(trackings)),
});
