import { IProduct } from '../../../../shared/interfaces/product';

export interface IHomeState {
  stats: Record<string, number> | undefined;
  tops: IProduct[] | undefined;
  errors: any;
}
