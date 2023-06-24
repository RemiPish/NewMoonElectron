import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CEquipModelDataComponent } from './c-equip-model-data.component';

describe('CEquipModelDataComponent', () => {
  let component: CEquipModelDataComponent;
  let fixture: ComponentFixture<CEquipModelDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CEquipModelDataComponent]
    });
    fixture = TestBed.createComponent(CEquipModelDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
