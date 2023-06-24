import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevilEquipmentDataComponent } from './devil-equipment-data.component';

describe('DevilEquipmentDataComponent', () => {
  let component: DevilEquipmentDataComponent;
  let fixture: ComponentFixture<DevilEquipmentDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevilEquipmentDataComponent]
    });
    fixture = TestBed.createComponent(DevilEquipmentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
