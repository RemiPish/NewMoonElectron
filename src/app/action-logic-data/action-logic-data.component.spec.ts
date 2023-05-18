import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionLogicDataComponent } from './action-logic-data.component';

describe('ActionLogicDataComponent', () => {
  let component: ActionLogicDataComponent;
  let fixture: ComponentFixture<ActionLogicDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionLogicDataComponent]
    });
    fixture = TestBed.createComponent(ActionLogicDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
