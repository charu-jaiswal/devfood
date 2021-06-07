import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWiseComponent } from './user-wise.component';

describe('OutletWiseSalesComponent', () => {
  let component: UserWiseComponent;
  let fixture: ComponentFixture<UserWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWiseComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
