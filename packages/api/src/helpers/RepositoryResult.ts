import { IRepositoryError } from './../interfaces'
export class RepositoryResult<T = any> {
  _error: IRepositoryError
  _data: T
  constructor(data: T, error: IRepositoryError = null) {
    this._error = error
    this._data = data
  }

  get error(): IRepositoryError {
    return this._error
  }

  get data(): T {
    return this._data
  }
}
