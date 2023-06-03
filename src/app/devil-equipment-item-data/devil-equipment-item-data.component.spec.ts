import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevilEquipmentItemDataComponent } from './devil-equipment-item-data.component';

describe('DevilEquipmentItemDataComponent', () => {
  let component: DevilEquipmentItemDataComponent;
  let fixture: ComponentFixture<DevilEquipmentItemDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevilEquipmentItemDataComponent]
    });
    fixture = TestBed.createComponent(DevilEquipmentItemDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
