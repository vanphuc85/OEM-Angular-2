import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDeviceComponent } from './alert-device.component';

describe('AlertDeviceComponent', () => {
  let component: AlertDeviceComponent;
  let fixture: ComponentFixture<AlertDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
