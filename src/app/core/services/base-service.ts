import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageableResponse } from '../models/pageable-response';
@Injectable()
export abstract class BaseService<T> {
  endpoint!: string;
  constructor(protected http: HttpClient) {}
  getPaginatedList(
    pageSize: number,
    pageIndex: number
  ): Observable<PageableResponse<T>> {
    const params = new HttpParams()
      .set('size', pageSize)
      .set('page', pageIndex);
    return this.http.get<PageableResponse<T>>(this.endpoint, { params });
  }
}
