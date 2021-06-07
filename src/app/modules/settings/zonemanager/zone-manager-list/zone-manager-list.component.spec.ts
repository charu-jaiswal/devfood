import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneManagerListComponent } from './zone-manager-list.component';

describe('ZoneManagerListComponent', () => {
  let component: ZoneManagerListComponent;
  let fixture: ComponentFixture<ZoneManagerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneManagerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
