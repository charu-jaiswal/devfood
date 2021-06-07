import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletWiseSalesComponent } from './outlet-wise-sales.component';

describe('OutletWiseSalesComponent', () => {
  let component: OutletWiseSalesComponent;
  let fixture: ComponentFixture<OutletWiseSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutletWiseSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletWiseSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
