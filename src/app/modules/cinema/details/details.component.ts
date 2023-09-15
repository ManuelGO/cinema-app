import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, switchMap, tap } from 'rxjs';
import { BaseEntity } from 'src/app/core/models/base-entity';
import { Cinema } from 'src/app/core/models/cinema';
import { CinemaParams } from 'src/app/core/models/cinema-params';
import { EntityType } from 'src/app/core/models/entity-type.enum';
import { Screening } from 'src/app/core/models/screening';
import { CinemasService } from 'src/app/core/services/cinemas/cinemas.service';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  cinema!: Cinema;
  screensColumns = ['id', 'name'];
  screeningsColumns = ['id', 'cinemaName', 'movieName'];
  screenDataSource = new MatTableDataSource<BaseEntity>();
  screeningDataSource = new MatTableDataSource<Screening>();
  screeningsTotal!: number;
  screensTotal!: number;
  cinemaParams$: Observable<CinemaParams | null> =
    this.cinemasService.getCurrentParams();
  private destroyRef = inject(DestroyRef);

  constructor(
    private dialogService: DialogService,
    private cinemasService: CinemasService
  ) {}
  ngOnInit(): void {
    this.cinemaParams$
      .pipe(
        switchMap((params) =>
          this.cinemasService.listScreenings(params?.cinema.id!).pipe(
            tap((list) => {
              this.cinema = params?.cinema!;
              this.screenDataSource = new MatTableDataSource(
                params?.cinema.screens
              );
              this.screeningDataSource = new MatTableDataSource(list.content);
              this.screeningsTotal = list.numberOfElements;
            })
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  addScreen() {
    this.dialogService
      .showFormDialog(this.cinemasService, EntityType.SCREEN, this.cinema.id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => this.cinemasService.getCurrentCinema())
      )
      .subscribe();
  }
}
