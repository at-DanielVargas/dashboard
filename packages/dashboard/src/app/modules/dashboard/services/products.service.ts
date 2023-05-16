import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../../shared/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getTopSells(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(
      `http://localhost:3001/api/v1/products/top-sells`
    );
  }
}
