import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, mergeMap, of, toArray } from 'rxjs';
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

  getAllPages(): Observable<T[]> {
    const pageSize = 50;
    return this.getPaginatedList(pageSize, 0, '').pipe(
      mergeMap((firstPageResponse) => {
        const totalPages = firstPageResponse.totalPages;
        const additionalRequests = [];
        for (let i = 1; i < totalPages; i++) {
          additionalRequests.push(this.getPaginatedList(pageSize, i, ''));
        }

        // Return an Observable that emits all of the responses, including the first page response.
        const requests = [of(firstPageResponse), ...additionalRequests];
        return forkJoin(requests).pipe(
          // Merge the responses into a single Observable.
          mergeMap((responses) => responses),
          // Map each response to its content.
          map((response) => response.content),
          // Collect all of the content into an array.
          toArray()
        );
      }),
      map((responses) => responses.flat())
    );
  }

  abstract saveItem(
    item: T,
    type?: string,
    entityId?: number
  ): Observable<null>;
}
