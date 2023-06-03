import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevilFusionDataComponent } from './devil-fusion-data.component';

describe('DevilFusionDataComponent', () => {
  let component: DevilFusionDataComponent;
  let fixture: ComponentFixture<DevilFusionDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevilFusionDataComponent]
    });
    fixture = TestBed.createComponent(DevilFusionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
