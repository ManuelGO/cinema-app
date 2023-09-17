import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import {
  DEFAULT_PAGES_SIZE,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT,
} from 'src/app/core/constants/global.constans';
import { EntityType } from 'src/app/core/models/entity-type.enum';
import { Movie } from 'src/app/core/models/movie';
import { TableLoadEvent } from 'src/app/core/models/table-load-event';
import { MoviesService } from 'src/app/core/services/movies/movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent {
  @Input() displayedColumns = ['id', 'name', 'screens', 'create'];
  @Input() pageSizes = DEFAULT_PAGES_SIZE;
  @Output() screenCreationRequested: EventEmitter<number> = new EventEmitter();
  @Output() movieSelected: EventEmitter<Movie> = new EventEmitter();

  dataSource = new MatTableDataSource<Movie>();
  totalElements!: number;
  entityType = EntityType;
  constructor(private moviesService: MoviesService) {}

  loadData(event: TableLoadEvent) {
    return this.moviesService
      .getPaginatedList(event.pageSize, event.pageIndex, '', event.sort)
      .pipe(
        tap((response) => {
          this.totalElements = response.totalElements;
          this.dataSource = new MatTableDataSource(response.content);
        })
      )
      .subscribe();
  }

  selected(movie: Movie) {
    this.movieSelected.emit(movie);
  }

  refreshData() {
    this.loadData({
      pageIndex: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_SIZE,
      sort: DEFAULT_SORT,
    });
  }
}
