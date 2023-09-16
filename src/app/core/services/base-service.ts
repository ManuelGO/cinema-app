import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DEFAULT_SORT } from '../constants/global.constans';
import { PageableResponse } from '../models/pageable-response';
@Injectable()
export abstract class BaseService<T> {
  endpoint!: string;
  constructor(protected http: HttpClient) {}
  getPaginatedList(
    pageSize: number,
    pageIndex: number,
    searchText: string = '',
    sort: string = DEFAULT_SORT
  ): Observable<PageableResponse<T>> {
    const params = new HttpParams()
      .set('size', pageSize)
      .set('page', pageIndex)
      .set('sort', sort)
      .set('search', searchText);
    return this.http.get<PageableResponse<T>>(this.endpoint, { params });
  }

  abstract saveItem(
    item: T,
    type?: string,
    entityId?: number
  ): Observable<null>;
}
