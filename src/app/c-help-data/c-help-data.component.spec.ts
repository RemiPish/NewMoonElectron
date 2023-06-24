import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CHelpDataComponent } from './c-help-data.component';

describe('CHelpDataComponent', () => {
  let component: CHelpDataComponent;
  let fixture: ComponentFixture<CHelpDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CHelpDataComponent]
    });
    fixture = TestBed.createComponent(CHelpDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
