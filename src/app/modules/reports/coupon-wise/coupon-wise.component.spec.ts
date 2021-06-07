import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponWiseComponent } from './coupon-wise.component';

describe('OutletWiseSalesComponent', () => {
  let component: CouponWiseComponent;
  let fixture: ComponentFixture<CouponWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponWiseComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
