import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../../shared/interfaces/order';
import { IPaginatedResponse } from '../../shared/interfaces/app';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private httpClient: HttpClient) {}

  getOrders({
    page,
  }: {
    page: number;
  }): Observable<IPaginatedResponse<IOrder>> {
    return this.httpClient.get<IPaginatedResponse<IOrder>>(
      `http://localhost:3000/orders?page=${page}`
    );
  }

  getOrderDetails(id: string | undefined): Observable<{ order: IOrder }> {
    return this.httpClient.get<{ order: IOrder }>(
      `http://localhost:3000/orders/${id}`
    );
  }
}
