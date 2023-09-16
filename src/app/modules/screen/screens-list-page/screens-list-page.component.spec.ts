import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreensListPageComponent } from './screens-list-page.component';

describe('ScreensListPageComponent', () => {
  let component: ScreensListPageComponent;
  let fixture: ComponentFixture<ScreensListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreensListPageComponent]
    });
    fixture = TestBed.createComponent(ScreensListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
