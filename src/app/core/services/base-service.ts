import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { PageableResponse } from "../models/pageable-response";
import { Injectable } from '@angular/core';
@Injectable()
export abstract class BaseService<T> {
  endpoint!: string;
  constructor(protected http: HttpClient) {}
  getPaginatedList(params: any): Observable<PageableResponse<T>> {
    return this.http.get<PageableResponse<T>>(this.endpoint, {params})
  }
}
