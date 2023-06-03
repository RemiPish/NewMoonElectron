import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSpecialSkillEffectDataComponent } from './c-special-skill-effect-data.component';

describe('CSpecialSkillEffectDataComponent', () => {
  let component: CSpecialSkillEffectDataComponent;
  let fixture: ComponentFixture<CSpecialSkillEffectDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CSpecialSkillEffectDataComponent]
    });
    fixture = TestBed.createComponent(CSpecialSkillEffectDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
