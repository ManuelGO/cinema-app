import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { BaseEntity } from '../../models/base-entity';
import { Cinema } from '../../models/cinema';
import { EntityType } from '../../models/entity-type.enum';
import { PageableResponse } from '../../models/pageable-response';
import { Screening, ScreeningRaw } from '../../models/screening';
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

  listScreenings(cinemaId: number): Observable<PageableResponse<Screening>> {
    return this.http
      .get<PageableResponse<ScreeningRaw>>(
        `${this.endpoint}/${cinemaId}/screenings`
      )
      .pipe(
        map((response) => {
          const items = response.content;
          const newITems = items.map((item) => ({
            cinemaName: item.cinemaName,
            id: item.id,
            screenName: item.screenName,
            movieName: item.movie.name,
            startDate: item.start,
          }));
          return { ...response, content: newITems };
        })
      );
  }
}
