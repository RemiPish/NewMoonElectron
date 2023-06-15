import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CNakamaQuestRewardDataComponent } from './c-nakama-quest-reward-data.component';

describe('CNakanaQuestRewardDataComponent', () => {
  let component: CNakamaQuestRewardDataComponent;
  let fixture: ComponentFixture<CNakamaQuestRewardDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CNakamaQuestRewardDataComponent]
    });
    fixture = TestBed.createComponent(CNakamaQuestRewardDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
