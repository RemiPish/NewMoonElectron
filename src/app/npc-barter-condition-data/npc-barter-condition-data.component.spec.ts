import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpcBarterConditionDataComponent } from './npc-barter-condition-data.component';

describe('NpcBarterConditionDataComponent', () => {
  let component: NpcBarterConditionDataComponent;
  let fixture: ComponentFixture<NpcBarterConditionDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NpcBarterConditionDataComponent]
    });
    fixture = TestBed.createComponent(NpcBarterConditionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
