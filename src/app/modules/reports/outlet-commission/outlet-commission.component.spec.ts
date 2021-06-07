import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletCommissionComponent } from './outlet-commission.component';

describe('OutletCommissionComponent', () => {
  let component: OutletCommissionComponent;
  let fixture: ComponentFixture<OutletCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutletCommissionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
