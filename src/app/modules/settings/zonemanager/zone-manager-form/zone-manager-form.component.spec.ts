import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneManagerFormComponent } from './zone-manager-form.component';

describe('ZoneManagerFormComponent', () => {
  let component: ZoneManagerFormComponent;
  let fixture: ComponentFixture<ZoneManagerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneManagerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneManagerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
