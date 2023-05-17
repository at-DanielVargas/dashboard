import { Request } from 'express';
import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';

export interface AppRequest<T = undefined> extends Request {
  filters?: Record<string, string>;
  pagination: {
    page: number;
    limit: number;
  };
  dto?: T;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppServiceOptions
  extends Pick<AppRequest, 'pagination' | 'filters'> {}

export class ValidationDto<T> {
  @IsDefined()
  @ValidateNested()
  //@ts-ignore
  @Type(() => T)
  data: T;
}
