import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScreeningComponent } from './add-screening.component';

describe('AddScreeningComponent', () => {
  let component: AddScreeningComponent;
  let fixture: ComponentFixture<AddScreeningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddScreeningComponent]
    });
    fixture = TestBed.createComponent(AddScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
