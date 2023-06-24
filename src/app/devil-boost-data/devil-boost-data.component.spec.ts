import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevilBoostDataComponent } from './devil-boost-data.component';

describe('DevilBoostDataComponent', () => {
  let component: DevilBoostDataComponent;
  let fixture: ComponentFixture<DevilBoostDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevilBoostDataComponent]
    });
    fixture = TestBed.createComponent(DevilBoostDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
