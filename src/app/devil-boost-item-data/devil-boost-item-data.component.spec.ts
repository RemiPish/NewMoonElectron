import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevilBoostItemDataComponent } from './devil-boost-item-data.component';

describe('DevilBoostItemDataComponent', () => {
  let component: DevilBoostItemDataComponent;
  let fixture: ComponentFixture<DevilBoostItemDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevilBoostItemDataComponent]
    });
    fixture = TestBed.createComponent(DevilBoostItemDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
