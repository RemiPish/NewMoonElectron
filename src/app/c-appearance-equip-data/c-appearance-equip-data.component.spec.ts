import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CAppearanceEquipDataComponent } from './c-appearance-equip-data.component';

describe('CAppearanceEquipDataComponent', () => {
  let component: CAppearanceEquipDataComponent;
  let fixture: ComponentFixture<CAppearanceEquipDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CAppearanceEquipDataComponent]
    });
    fixture = TestBed.createComponent(CAppearanceEquipDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
