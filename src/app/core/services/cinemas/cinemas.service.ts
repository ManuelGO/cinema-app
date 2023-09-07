import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseEntity } from '../../models/base-entity';
import { Cinema } from '../../models/cinema';
import { EntityType } from '../../models/entity-type.enum';
import { PageableResponse } from '../../models/pageable-response';
import { BaseService } from '../base-service';

@Injectable({
  providedIn: 'root',
})
export class CinemasService extends BaseService<Cinema> {
  override endpoint = 'cinemas';

  override saveItem(newItem: Cinema, type?: string, entityId?: number) {
    console.log(type);
    switch (type) {
      case EntityType.CINEMA:
        console.log('adding cinema');
        return super.saveItem(newItem);
      case EntityType.SCREEN:
        // return this.saveScreen(cinema.id!, extras!) as any;
        console.log('adding screen', `${this.endpoint}/${entityId}/screens`);
        return this.saveScreen(entityId!, newItem);
    }

    return of({ foo: 'bar' } as any);
  }

  saveScreen(cinemaId: number, screen: BaseEntity): Observable<BaseEntity> {
    return this.http.put<BaseEntity>(
      `${this.endpoint}/${cinemaId}/screens`,
      screen
    );
  }

  listScreenings(cinemaId: number): Observable<PageableResponse<BaseEntity>> {
    return this.http.get<PageableResponse<BaseEntity>>(
      `${this.endpoint}/${cinemaId}/screenings`
    );
  }
}
