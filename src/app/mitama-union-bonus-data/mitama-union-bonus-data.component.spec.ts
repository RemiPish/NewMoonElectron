import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitamaUnionBonusDataComponent } from './mitama-union-bonus-data.component';

describe('MitamaUnionBonusComponent', () => {
  let component: MitamaUnionBonusDataComponent;
  let fixture: ComponentFixture<MitamaUnionBonusDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MitamaUnionBonusDataComponent]
    });
    fixture = TestBed.createComponent(MitamaUnionBonusDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
