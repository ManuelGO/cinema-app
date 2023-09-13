import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import { EntityType } from 'src/app/core/models/entity-type.enum';
import { Movie } from 'src/app/core/models/movie';
import { MoviesService } from 'src/app/core/services/movies/movies.service';
import { DialogService } from './../../../core/services/dialog/dialog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  displayedColumns = ['id', 'name', 'runtime'];
  dataSource = new MatTableDataSource<Movie>();
  totalElements!: number;
  pageSizes = [10, 15, 20];
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
      .subscribe((l) => console.log(l));
  }
}
