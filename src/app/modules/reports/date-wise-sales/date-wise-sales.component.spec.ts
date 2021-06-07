import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateWiseSalesComponent } from './date-wise-sales.component';

describe('DateWiseSalesComponent', () => {
  let component: DateWiseSalesComponent;
  let fixture: ComponentFixture<DateWiseSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateWiseSalesComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateWiseSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
