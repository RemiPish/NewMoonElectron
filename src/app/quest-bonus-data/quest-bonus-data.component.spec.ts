import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestBonusDataComponent } from './quest-bonus-data.component';

describe('QuestBonusDataComponent', () => {
  let component: QuestBonusDataComponent;
  let fixture: ComponentFixture<QuestBonusDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestBonusDataComponent]
    });
    fixture = TestBed.createComponent(QuestBonusDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
