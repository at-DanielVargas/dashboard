import { IRepositoryError } from './../interfaces';
export class RepositoryResult<T = any> {
  constructor(data: T, error: IRepositoryError = null) {
    return {
      error,
      data,
    };
  }
}
