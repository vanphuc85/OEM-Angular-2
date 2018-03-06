import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationLoginComponent } from './location-login.component';

describe('LocationLoginComponent', () => {
  let component: LocationLoginComponent;
  let fixture: ComponentFixture<LocationLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
