import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BaseEntity } from 'src/app/core/models/base-entity';
import { EntityType } from 'src/app/core/models/entity-type.enum';
import { CinemasService } from 'src/app/core/services/cinemas/cinemas.service';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { Cinema } from './../../../core/models/cinema';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  cinema!: Cinema;
  displayedColumns = ['id', 'name'];
  dataSource = new MatTableDataSource<BaseEntity>();
  constructor(
    private router: Router,
    private dialogService: DialogService,
    private cinemasService: CinemasService
  ) {
    this.cinema = this.router.getCurrentNavigation()?.extras.state as Cinema;
    this.dataSource = new MatTableDataSource<BaseEntity>(this.cinema.screens);
  }

  addScreen() {
    this.dialogService
      .showFormDialog(this.cinemasService, EntityType.SCREEN, this.cinema.id)
      .subscribe((l) => console.log(l));
  }
}
