import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CEventMessageDataComponent } from './c-event-message-data.component';

describe('CEventMessageDataComponent', () => {
  let component: CEventMessageDataComponent;
  let fixture: ComponentFixture<CEventMessageDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CEventMessageDataComponent]
    });
    fixture = TestBed.createComponent(CEventMessageDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
