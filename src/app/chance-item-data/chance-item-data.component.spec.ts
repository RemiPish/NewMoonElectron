import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanceItemDataComponent } from './chance-item-data.component';

describe('ChanceItemDataComponent', () => {
  let component: ChanceItemDataComponent;
  let fixture: ComponentFixture<ChanceItemDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChanceItemDataComponent]
    });
    fixture = TestBed.createComponent(ChanceItemDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
