import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBigComponent } from './header-big.component';

describe('HeaderBigComponent', () => {
  let component: HeaderBigComponent;
  let fixture: ComponentFixture<HeaderBigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderBigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
