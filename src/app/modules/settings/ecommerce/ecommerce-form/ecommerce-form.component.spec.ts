import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceFormComponent } from './ecommerce-form.component';

describe('EcommerceFormComponent', () => {
  let component: EcommerceFormComponent;
  let fixture: ComponentFixture<EcommerceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcommerceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommerceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
