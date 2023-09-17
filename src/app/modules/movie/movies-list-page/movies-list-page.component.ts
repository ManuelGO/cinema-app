import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { finalize, tap } from 'rxjs';
import { MoviesListComponent } from 'src/app/components/movies-list/movies-list.component';
import { EntityType } from 'src/app/core/models/entity-type.enum';
import { Movie } from 'src/app/core/models/movie';
import { MoviesService } from 'src/app/core/services/movies/movies.service';
import { DialogService } from '../../../core/services/dialog/dialog.service';

@Component({
  selector: 'app-movies-list-page',
  templateUrl: './movies-list-page.component.html',
})
export class MoviesListPageComponent {
  displayedColumns = ['id', 'name', 'runtime'];
  dataSource = new MatTableDataSource<Movie>();
  totalElements!: number;
  pageSizes = [10, 15, 20];
  @ViewChild('moviesList') moviesList!: MoviesListComponent;

  constructor(
    private moviesService: MoviesService,
    private dialogService: DialogService
  ) {}
  loadData(event: any) {
    return this.moviesService
      .getPaginatedList(event.pageSize, event.pageIndex)
      .pipe(
        tap((response) => {
          this.totalElements = response.totalElements;
          this.dataSource = new MatTableDataSource(response.content);
        })
      )
      .subscribe();
  }
  addItem() {
    this.dialogService
      .showFormDialog(this.moviesService, EntityType.MOVIE)
      .pipe(finalize(() => this.moviesList.refreshData()))
      .subscribe();
  }
}
