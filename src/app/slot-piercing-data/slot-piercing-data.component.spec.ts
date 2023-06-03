import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotPiercingDataComponent } from './slot-piercing-data.component';

describe('SlotPiercingDataComponent', () => {
  let component: SlotPiercingDataComponent;
  let fixture: ComponentFixture<SlotPiercingDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlotPiercingDataComponent]
    });
    fixture = TestBed.createComponent(SlotPiercingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
