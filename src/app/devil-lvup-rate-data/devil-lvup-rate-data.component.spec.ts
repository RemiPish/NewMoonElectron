import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevilLvupRateDataComponent } from './devil-lvup-rate-data.component';

describe('DevilLvupRateDataComponent', () => {
  let component: DevilLvupRateDataComponent;
  let fixture: ComponentFixture<DevilLvupRateDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevilLvupRateDataComponent]
    });
    fixture = TestBed.createComponent(DevilLvupRateDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
