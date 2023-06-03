import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardianUnlockDataComponent } from './guardian-unlock-data.component';

describe('GuardianUnlockDataComponent', () => {
  let component: GuardianUnlockDataComponent;
  let fixture: ComponentFixture<GuardianUnlockDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuardianUnlockDataComponent]
    });
    fixture = TestBed.createComponent(GuardianUnlockDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
