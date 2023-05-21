import { IProduct } from '../../../../shared/interfaces/product'

export interface IHomeState {
  tops: IProduct[] | undefined
  sells: number
  products: number
  profit: number
  errors: any
}
