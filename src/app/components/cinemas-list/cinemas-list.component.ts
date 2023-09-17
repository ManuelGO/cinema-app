import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, tap } from 'rxjs';
import { DEFAULT_PAGES_SIZE } from 'src/app/core/constants/global.constans';
import { Cinema } from 'src/app/core/models/cinema';
import { EntityType } from 'src/app/core/models/entity-type.enum';
import { TableLoadEvent } from 'src/app/core/models/table-load-event';
import { CinemasService } from 'src/app/core/services/cinemas/cinemas.service';

@Component({
  selector: 'app-cinemas-list',
  templateUrl: './cinemas-list.component.html',
})
export class CinemasListComponent {
  @Input() displayedColumns = ['id', 'name', 'screens', 'create'];
  @Input() allowNavigation = false;
  dataSource = new MatTableDataSource<Cinema>();
  totalElements!: number;
  @Input() pageSizes = DEFAULT_PAGES_SIZE;
  entityType = EntityType;
  @Output() screenCreationRequested: EventEmitter<number> = new EventEmitter();
  @Output() cinemaSelected: EventEmitter<Cinema> = new EventEmitter();
  @Output() navigate: EventEmitter<{ cinema: Cinema; params: TableLoadEvent }> =
    new EventEmitter();
  lastLoadEvent$: BehaviorSubject<TableLoadEvent> = new BehaviorSubject({
    pageSize: 10,
    pageIndex: 0,
    sort: '',
  });
  constructor(private cinemasService: CinemasService) {}

  loadData(event: TableLoadEvent) {
    this.lastLoadEvent$.next(event);
    return this.cinemasService
      .getPaginatedList(event.pageSize, event.pageIndex, '', event.sort)
      .pipe(
        tap((response) => {
          this.totalElements = response.totalElements;
          this.dataSource = new MatTableDataSource(response.content);
        })
      )
      .subscribe();
  }

  requestScreenCreation(cinemaId: number) {
    this.screenCreationRequested.emit(cinemaId);
  }
  refreshData() {
    this.loadData(this.lastLoadEvent$.value);
  }
  selected(cinema: Cinema) {
    this.cinemaSelected.emit(cinema);
  }
  doNavigate(cinema: Cinema) {
    this.navigate.emit({ cinema, params: this.lastLoadEvent$.value });
  }
}
