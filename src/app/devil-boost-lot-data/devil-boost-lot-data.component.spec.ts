import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevilBoostLotDataComponent } from './devil-boost-lot-data.component';

describe('DevilBoostLotDataComponent', () => {
  let component: DevilBoostLotDataComponent;
  let fixture: ComponentFixture<DevilBoostLotDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevilBoostLotDataComponent]
    });
    fixture = TestBed.createComponent(DevilBoostLotDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
