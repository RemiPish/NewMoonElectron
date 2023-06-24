import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardianLevelDataComponent } from './guardian-level-data.component';

describe('GuardianLevelDataComponent', () => {
  let component: GuardianLevelDataComponent;
  let fixture: ComponentFixture<GuardianLevelDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuardianLevelDataComponent]
    });
    fixture = TestBed.createComponent(GuardianLevelDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
