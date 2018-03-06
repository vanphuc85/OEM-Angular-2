import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlertComponent } from './create-alert.component';

describe('CreateAlertComponent', () => {
  let component: CreateAlertComponent;
  let fixture: ComponentFixture<CreateAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
