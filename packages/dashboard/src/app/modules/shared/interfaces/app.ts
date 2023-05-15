import { IDashboardState } from '../../dashboard/store/dashboard.state';

export interface IAppState {
  dashboard: IDashboardState;
}

export interface IPaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: any;
  nextPage: number;
}
