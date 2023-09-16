import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import { DEFAULT_PAGES_SIZE } from 'src/app/core/constants/global.constans';
import { Screen } from 'src/app/core/models/screen';
import { TableLoadEvent } from 'src/app/core/models/table-load-event';
import { CinemasService } from 'src/app/core/services/cinemas/cinemas.service';

@Component({
  selector: 'app-screens-list-page',
  templateUrl: './screens-list-page.component.html',
  styleUrls: ['./screens-list-page.component.scss'],
})
export class ScreensListPageComponent {
  displayedColumns = ['name', 'id'];
  dataSource: MatTableDataSource<Screen> = new MatTableDataSource();
  totalElements!: number;
  pageSizes = DEFAULT_PAGES_SIZE;

  constructor(private cinemasService: CinemasService) {}

  loadData(event: TableLoadEvent) {
    const { pageIndex, pageSize } = event;
    return this.cinemasService
      .getAllScrens()
      .pipe(
        tap((response) => {
          this.totalElements = response.length;
          const startIndex = pageIndex * pageSize;
          const endIndex = startIndex + pageSize;
          const page = response.slice(startIndex, endIndex);
          this.dataSource = new MatTableDataSource(page);
        })
      )
      .subscribe();
  }
}
