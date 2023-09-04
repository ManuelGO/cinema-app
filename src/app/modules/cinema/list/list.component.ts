import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import { Cinema } from 'src/app/core/models/cinema';
import { EntityType } from 'src/app/core/models/entity-type.enum';
import { CinemasService } from 'src/app/core/services/cinemas/cinemas.service';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  displayedColumns = ['id', 'name', 'screens'];
  dataSource = new MatTableDataSource<Cinema>();
  totalElements!: number;
  pageSizes = [10, 15, 20];
  isLoading!: boolean;
  constructor(
    private cinemasService: CinemasService,
    private dialogService: DialogService
  ) {}
  loadData(event: any) {
    return this.cinemasService
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
      .showFormDialog(this.cinemasService, EntityType.CINEMA)
      .subscribe((l) => console.log(l));
  }
}
