import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from 'src/main';
import { Config } from '../../models/config';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
  constructor(@Inject(APP_CONFIG) public config: Config) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const { apiUrl, apiVersion } = this.config;
    const req = request.clone({
      url: `${apiUrl}${apiVersion}/${request.url}`,
    });
    return next.handle(req);
  }
}
