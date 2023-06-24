import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CQuestDataComponent } from './c-quest-data.component';

describe('CQuestDataComponent', () => {
  let component: CQuestDataComponent;
  let fixture: ComponentFixture<CQuestDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CQuestDataComponent]
    });
    fixture = TestBed.createComponent(CQuestDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
