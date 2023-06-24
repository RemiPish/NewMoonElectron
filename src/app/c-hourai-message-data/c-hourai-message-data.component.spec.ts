import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CHouraiMessageDataComponent } from './c-hourai-message-data.component';

describe('CHouraiMessageDataComponent', () => {
  let component: CHouraiMessageDataComponent;
  let fixture: ComponentFixture<CHouraiMessageDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CHouraiMessageDataComponent]
    });
    fixture = TestBed.createComponent(CHouraiMessageDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
