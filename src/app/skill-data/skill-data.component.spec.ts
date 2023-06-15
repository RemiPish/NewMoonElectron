import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillDataComponent } from './skill-data.component';

describe('SkillDataComponent', () => {
  let component: SkillDataComponent;
  let fixture: ComponentFixture<SkillDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillDataComponent]
    });
    fixture = TestBed.createComponent(SkillDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
