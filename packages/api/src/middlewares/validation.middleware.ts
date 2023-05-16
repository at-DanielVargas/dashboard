import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Response, NextFunction } from 'express';
import { AppRequest, ValidationDto } from '../interfaces';

export function validateDto<T>(dtoClass: new () => T) {
  return async function (
    req: AppRequest<T>,
    res: Response,
    next: NextFunction
  ) {
    const validationDto = plainToClass(
      ValidationDto,
      { data: req.body },
      { excludeExtraneousValues: true }
    );
    const dto = plainToClass(dtoClass, validationDto.data, {
      excludeExtraneousValues: true,
    });
    const errors = await validate(dto as object);

    if (errors.length > 0) {
      res.status(400).json({ errors });
    } else {
      req.dto = dto;
      next();
    }
  };
}
