import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentSetDataComponent } from './equipment-set-data.component';

describe('EquipmentSetDataComponent', () => {
  let component: EquipmentSetDataComponent;
  let fixture: ComponentFixture<EquipmentSetDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipmentSetDataComponent]
    });
    fixture = TestBed.createComponent(EquipmentSetDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
