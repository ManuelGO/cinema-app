import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, map, startWith, switchMap, tap } from 'rxjs';
import { BaseEntity } from 'src/app/core/models/base-entity';
import { Movie } from 'src/app/core/models/movie';
import { MoviesService } from 'src/app/core/services/movies/movies.service';

@Component({
  selector: 'app-search-input',
  template: ` <mat-form-field>
    <input
      type="text"
      placeholder="Search movie"
      matInput
      [matAutocomplete]="auto"
    />
    <div class="inner">
      <span class="value">{{ searchText.value }}</span>
    </div>
    <mat-autocomplete
      #auto="matAutocomplete"
      [displayWith]="displayFn"
      (optionSelected)="selectedEvent.emit($event.option.value)"
    >
      <ng-container *ngIf="options$ | async as options">
        <mat-option *ngFor="let option of options" [value]="option">
          {{ option.name }}
        </mat-option>
      </ng-container>
    </mat-autocomplete>
  </mat-form-field>`,
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements AfterViewInit {
  @Output() selectedEvent: EventEmitter<BaseEntity> = new EventEmitter();
  options$ = new BehaviorSubject<BaseEntity[]>([]);
  searchText = new FormControl('');

  constructor(private moviesService: MoviesService) {}

  displayFn(movie: Movie) {
    return movie?.name;
  }

  ngAfterViewInit(): void {
    this.searchText.valueChanges
      .pipe(
        map((value: string | null) => value ?? ''),
        startWith(''),
        switchMap((searchTerm: string) => {
          return this.fetch(searchTerm);
        }),
        tap((options: BaseEntity[]) => {
          this.options$.next(options);
        })
      )
      .subscribe((response) => {
        this.options$.next(response);
      });
  }

  fetch(searchTerm: string) {
    return this.moviesService
      .getPaginatedList(20, 1, searchTerm)
      .pipe(map((response) => response.content));
  }
}
