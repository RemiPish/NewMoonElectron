import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitamaReunionSetBonusDataComponent } from './mitama-reunion-set-bonus-data.component';

describe('MitamaReunionSetBonusDataComponent', () => {
  let component: MitamaReunionSetBonusDataComponent;
  let fixture: ComponentFixture<MitamaReunionSetBonusDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MitamaReunionSetBonusDataComponent]
    });
    fixture = TestBed.createComponent(MitamaReunionSetBonusDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
