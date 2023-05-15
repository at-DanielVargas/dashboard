import express from 'express';
import { EOrderKind, trackings } from './trackings';
import { faker } from '@faker-js/faker/locale/es_MX';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

const app = express();

app.get('/orders', (req, res) => {
  const data = new Array(50).fill({}).map((order) => ({
    kind: faker.helpers.arrayElement(Object.values(EOrderKind)),
    time: faker.string.numeric(),
    orderId: faker.string.uuid(),
    productSKU: faker.string.alphanumeric(8),
    RMA: faker.string.alphanumeric(9),
    address: `${faker.location.city()} ${faker.location.country()}, ${faker.address.streetAddress()}`,
    trackingCode: faker.helpers.arrayElement(trackings),
    notes: faker.commerce.productDescription(),
  }));
  res.send({ data });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
