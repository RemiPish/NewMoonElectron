import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevilBoostExtraDataComponent } from './devil-boost-extra-data.component';

describe('DevilBoostExtraDataComponent', () => {
  let component: DevilBoostExtraDataComponent;
  let fixture: ComponentFixture<DevilBoostExtraDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevilBoostExtraDataComponent]
    });
    fixture = TestBed.createComponent(DevilBoostExtraDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
