import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { IProduct, ISellsProfit } from '../../shared/interfaces/product'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getTopSells(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`http://localhost:3001/api/v1/products/top-sells`)
  }

  getSellsProfit(): Observable<ISellsProfit> {
    return this.httpClient.get<ISellsProfit>(`http://localhost:3001/api/v1/products/profit`)
  }
}
