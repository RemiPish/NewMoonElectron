import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTimeAttackDataComponent } from './c-time-attack-data.component';

describe('CTimeAttackDataComponent', () => {
  let component: CTimeAttackDataComponent;
  let fixture: ComponentFixture<CTimeAttackDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CTimeAttackDataComponent]
    });
    fixture = TestBed.createComponent(CTimeAttackDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
