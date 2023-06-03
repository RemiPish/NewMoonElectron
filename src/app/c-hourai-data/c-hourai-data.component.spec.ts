import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CHouraiDataComponent } from './c-hourai-data.component';

describe('CHouraiDataComponent', () => {
  let component: CHouraiDataComponent;
  let fixture: ComponentFixture<CHouraiDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CHouraiDataComponent]
    });
    fixture = TestBed.createComponent(CHouraiDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
