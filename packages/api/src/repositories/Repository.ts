export class Repository<T> {
  protected model: T;

  constructor(model: T) {
    this.model = model;
  }
}
