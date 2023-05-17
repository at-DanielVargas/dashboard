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
    kind,
  }: {
    kind: string;
  }): Observable<IPaginatedResponse<IOrder>> {
    return this.httpClient.get<IPaginatedResponse<IOrder>>(
      `http://localhost:3001/api/v1/orders?kind=${kind}`
    );
  }

  getOrderDetails(id: string | undefined): Observable<{ order: IOrder }> {
    return this.httpClient.get<{ order: IOrder }>(
      `http://localhost:3001/api/v1/orders/${id}`
    );
  }

  getOrdersStats(): Observable<Record<string, number>> {
    return this.httpClient.get<Record<string, number>>(
      `http://localhost:3001/api/v1/orders/stats`
    );
  }
}
