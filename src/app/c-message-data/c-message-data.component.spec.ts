import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMessageDataComponent } from './c-message-data.component';

describe('CMessageDataComponent', () => {
  let component: CMessageDataComponent;
  let fixture: ComponentFixture<CMessageDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CMessageDataComponent]
    });
    fixture = TestBed.createComponent(CMessageDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
