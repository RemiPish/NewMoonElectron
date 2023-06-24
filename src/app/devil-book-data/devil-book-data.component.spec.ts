import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevilBookDataComponent } from './devil-book-data.component';

describe('DevilBookDataComponent', () => {
  let component: DevilBookDataComponent;
  let fixture: ComponentFixture<DevilBookDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevilBookDataComponent]
    });
    fixture = TestBed.createComponent(DevilBookDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
