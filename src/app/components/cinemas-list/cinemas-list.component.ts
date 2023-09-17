import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, tap } from 'rxjs';
import { DEFAULT_PAGES_SIZE } from 'src/app/core/constants/global.constans';
import { Cinema } from 'src/app/core/models/cinema';
import { CinemaParams } from 'src/app/core/models/cinema-params';
import { TableLoadEvent } from 'src/app/core/models/table-load-event';
import { CinemasService } from 'src/app/core/services/cinemas/cinemas.service';

@Component({
  selector: 'app-cinemas-list',
  templateUrl: './cinemas-list.component.html',
})
/**
 * `CinemasListComponent` is a component responsible for displaying a list of cinemas using the table-base component.
 * It provides functionality for loading, displaying, and interacting with cinema data.
 */
export class CinemasListComponent {
  /**
   * Input property to specify the list of columns to be displayed in the cinema table.
   * Default columns include 'id', 'name', 'screens', and 'create'.
   */
  @Input() displayedColumns = ['id', 'name', 'screens', 'create'];
  /**
   * Input property to enable or disable navigation actions within the cinema list.
   * If set to `true`, it allows navigation actions; otherwise, navigation is disabled.
   */

  @Input() allowNavigation = false;
  /**
   * Input property to specify the available page sizes for pagination.
   * It defaults to `DEFAULT_PAGES_SIZE` or can be customized as needed.
   */
  @Input() pageSizes = DEFAULT_PAGES_SIZE;

  /**
   * Output event emitted when a request to create a screen associated with a cinema is requested.
   * It emits the cinema's unique identifier (ID) to indicate which cinema the screen is related to.
   */

  @Output() screenCreationRequested: EventEmitter<number> = new EventEmitter();

  /**
   * Output event emitted when a cinema is selected from the list.
   * It emits the selected `Cinema` object.
   */
  @Output() cinemaSelected: EventEmitter<Cinema> = new EventEmitter();

  /**
   * Output event emitted when a navigation action is triggered, typically for viewing cinema details.
   * It emits an object containing the selected cinema and associated table load event parameters.
   */
  @Output() navigate: EventEmitter<CinemaParams> = new EventEmitter();

  /**
   * A BehaviorSubject used to track the last load event, which includes parameters for pagination and sorting.
   * It is initialized with default values for page size, page index, and sorting.
   */
  lastLoadEvent$: BehaviorSubject<TableLoadEvent> = new BehaviorSubject({
    pageSize: 10,
    pageIndex: 0,
    sort: '',
  });
  dataSource = new MatTableDataSource<Cinema>();
  totalElements!: number;
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
