import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import {
  DEFAULT_PAGES_SIZE,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT,
} from 'src/app/core/constants/global.constans';
import { Movie } from 'src/app/core/models/movie';
import { TableLoadEvent } from 'src/app/core/models/table-load-event';
import { MoviesService } from 'src/app/core/services/movies/movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
})
/**
 * `MoviesListComponent` is an Angular component responsible for displaying a list of movies using the table-base component.
 *  It provides the ability to load, display, and interact with movie data.
 */
export class MoviesListComponent {
  /**
   * Input property to specify the list of columns to be displayed in the table.
   * Default columns include 'id', 'name', 'screens', and 'create'.
   */
  @Input() displayedColumns = ['id', 'name', 'screens', 'create'];
  /**
   * Input property to specify the available page sizes for pagination.
   * It defaults to `DEFAULT_PAGES_SIZE` or can be customized as needed.
   */

  @Input() pageSizes = DEFAULT_PAGES_SIZE;
  /**
   * Output event emitted when a movie is selected from the list.
   * It emits the selected movie object.
   */
  @Output() movieSelected: EventEmitter<Movie> = new EventEmitter();
  /**
   * Data source for the movie table.
   */
  dataSource = new MatTableDataSource<Movie>();
  /**
   * Total number of elements in the movie data source.
   */
  totalElements!: number;

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
