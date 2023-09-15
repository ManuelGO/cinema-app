import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../../models/booking';
import { BaseService } from '../base-service';

@Injectable({
  providedIn: 'root',
})
export class BookingsService extends BaseService<Booking> {
  override saveItem(
    item: Booking,
    type?: string | undefined,
    entityId?: number | undefined
  ): Observable<null> {
    throw new Error('Method not implemented.');
  }
  override endpoint = 'bookings';
  /**
   *
   *
   * @param {number} screeningId  - The ID of the screening.
   * @param {number} numSeats- The number of seats to book.
   * @return {Observable<Booking>}  - An observable of the created booking.
   * @memberof BookingsService
   */
  createBooking(screeningId: number, numSeats: number): Observable<Booking> {
    return this.http.put<Booking>(this.endpoint, {
      screeningId: 407,
      seat: numSeats,
    });
  }
}
