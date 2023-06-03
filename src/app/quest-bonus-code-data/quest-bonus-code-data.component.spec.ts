import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestBonusCodeDataComponent } from './quest-bonus-code-data.component';

describe('QuestBonusCodeDataComponent', () => {
  let component: QuestBonusCodeDataComponent;
  let fixture: ComponentFixture<QuestBonusCodeDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestBonusCodeDataComponent]
    });
    fixture = TestBed.createComponent(QuestBonusCodeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
