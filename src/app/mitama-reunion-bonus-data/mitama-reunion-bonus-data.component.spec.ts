import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitamaReunionBonusDataComponent } from './mitama-reunion-bonus-data.component';

describe('MitamaReunionBonusDataComponent', () => {
  let component: MitamaReunionBonusDataComponent;
  let fixture: ComponentFixture<MitamaReunionBonusDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MitamaReunionBonusDataComponent]
    });
    fixture = TestBed.createComponent(MitamaReunionBonusDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
