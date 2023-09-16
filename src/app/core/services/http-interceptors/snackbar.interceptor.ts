import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable()
export class SnackbarInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event) => {
        if (request.method === 'PUT') {
          if (event instanceof HttpResponse && event.status === 201) {
            this.snackBar.open('Item saved successfully.', 'close', {
              duration: 3000,
            });
          }
        }
      }),
      catchError((error) => {
        this.snackBar.open(
          `Something went wrong. Try again later. Error code ${error.status}`,
          'close',
          {
            duration: 500000,
          }
        );
        return of(error);
      })
    );
  }
}
