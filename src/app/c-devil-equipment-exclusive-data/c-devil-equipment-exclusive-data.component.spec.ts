import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDevilEquipmentExclusiveDataComponent } from './c-devil-equipment-exclusive-data.component';

describe('CDevilEquipmentExclusiveDataComponent', () => {
  let component: CDevilEquipmentExclusiveDataComponent;
  let fixture: ComponentFixture<CDevilEquipmentExclusiveDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CDevilEquipmentExclusiveDataComponent]
    });
    fixture = TestBed.createComponent(CDevilEquipmentExclusiveDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
