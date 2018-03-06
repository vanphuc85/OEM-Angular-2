import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureAlertComponent } from './measure-alert.component';

describe('MeasureAlertComponent', () => {
  let component: MeasureAlertComponent;
  let fixture: ComponentFixture<MeasureAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasureAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
