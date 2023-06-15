import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardianAssistDataComponent } from './guardian-assist-data.component';

describe('GuardianAssistDataComponent', () => {
  let component: GuardianAssistDataComponent;
  let fixture: ComponentFixture<GuardianAssistDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuardianAssistDataComponent]
    });
    fixture = TestBed.createComponent(GuardianAssistDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
