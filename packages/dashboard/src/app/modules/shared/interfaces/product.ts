import { ICategory } from './category';

export interface IProduct {
  _id?: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  supplierPrice: number;
  purchases: number;
  category: ICategory;
  createdAt: string;
  updatedAt: string;
}

export interface ISellsProfit {
  totalSells: number;
  totalProfit: number;
  total: number;
}
