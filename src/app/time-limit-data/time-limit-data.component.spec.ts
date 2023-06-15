import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLimitDataComponent } from './time-limit-data.component';

describe('TimeLimitDataComponent', () => {
  let component: TimeLimitDataComponent;
  let fixture: ComponentFixture<TimeLimitDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeLimitDataComponent]
    });
    fixture = TestBed.createComponent(TimeLimitDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
