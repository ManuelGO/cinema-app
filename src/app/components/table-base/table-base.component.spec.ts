import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBaseComponent } from './table-base.component';

describe('TableBaseComponent', () => {
  let component: TableBaseComponent;
  let fixture: ComponentFixture<TableBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableBaseComponent]
    });
    fixture = TestBed.createComponent(TableBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
