import { Injectable } from '@angular/core';
import { BaseService } from '../base-service';
import { Cinema } from '../../models/cinema';
import { BaseEntity } from '../../models/base-entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CinemasService extends BaseService<Cinema> {
  override endpoint = 'cinema'

  saveCinema(cinema: Cinema): Observable<Cinema> {
    return this.http.put<Cinema>(`${this.endpoint}`, cinema)
  }

  saveScreen(cinemaId: number, screen: BaseEntity): Observable<BaseEntity> {
    return this.http.put<BaseEntity> (`${this.endpoint}/${cinemaId}/screens`, screen);
  }
}
