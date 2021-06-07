import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceListComponent } from './ecommerce-list.component';

describe('EcommerceListComponent', () => {
  let component: EcommerceListComponent;
  let fixture: ComponentFixture<EcommerceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcommerceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommerceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
