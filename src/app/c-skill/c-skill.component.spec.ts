import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSkillComponent } from './c-skill.component';

describe('CSkillComponent', () => {
  let component: CSkillComponent;
  let fixture: ComponentFixture<CSkillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CSkillComponent]
    });
    fixture = TestBed.createComponent(CSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
