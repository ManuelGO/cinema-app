import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesListPageComponent } from './movies-list-page.component';

describe('MoviesListPageComponent', () => {
  let component: MoviesListPageComponent;
  let fixture: ComponentFixture<MoviesListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesListPageComponent]
    });
    fixture = TestBed.createComponent(MoviesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
