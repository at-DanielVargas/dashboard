import { HTTP_STATUS } from './constants/http'
import { Request } from 'express'
import * as yup from 'yup'
import { IUser } from './models/user.model'

export interface AppRequest<T = undefined> extends Request {
  filters?: Record<string, string>
  search?: string
  pagination: {
    page: number
    limit: number
  }
  user?: IUser;
}

export interface Handler {
  index: (...args: any[]) => Promise<any>
  show: (...args: any[]) => Promise<any>
  update: (...args: any[]) => Promise<any>
  destroy: (...args: any[]) => Promise<any>
}

export interface IRepositoryResult<T = unknown> {
  error: IRepositoryError | null
  data: T
}
export interface IRepositoryError {
  statusCode: HTTP_STATUS
  details: { [k: string]: any } | any
  [k: string]: any
}

export interface IRepository {
  [M: string]: (...args: any[]) => Promise<IRepositoryResult>
}

export type ConditionalSchema<T> = T extends string
  ? yup.StringSchema
  : T extends number
  ? yup.NumberSchema
  : T extends boolean
  ? yup.BooleanSchema
  : T extends Record<any, any>
  ? yup.AnyObjectSchema
  : T extends Array<any>
  ? yup.ArraySchema<any, any>
  : yup.AnySchema

export type Shape<Fields> = {
  [Key in keyof Fields]: ConditionalSchema<Fields[Key]>
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppServiceOptions extends Partial<Pick<AppRequest, 'pagination' | 'filters' | 'search'>> {}
