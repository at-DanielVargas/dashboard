import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { IOrder } from '../../shared/interfaces/order'
import { IPaginatedResponse } from '../../shared/interfaces/app'

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private httpClient: HttpClient) {}

  getOrders(urlParams: { kind: string; page: string }): Observable<IPaginatedResponse<IOrder>> {
    const params = new URLSearchParams(urlParams)

    return this.httpClient.get<IPaginatedResponse<IOrder>>(`http://localhost:3001/api/v1/orders?${params.toString()}`)
  }

  getOrderDetails(id: string | undefined): Observable<{ order: IOrder }> {
    return this.httpClient.get<{ order: IOrder }>(`http://localhost:3001/api/v1/orders/${id}`)
  }

  getOrdersStats(): Observable<Record<string, number>> {
    return this.httpClient.get<Record<string, number>>(`http://localhost:3001/api/v1/orders/stats`)
  }

  getOrderTracking(id: string): Observable<IOrder> {
    return this.httpClient.get<IOrder>(`http://localhost:3001/api/v1/orders/${id}/tracking`)
  }
}
