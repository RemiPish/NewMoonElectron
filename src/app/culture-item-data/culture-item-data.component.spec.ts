import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultureItemDataComponent } from './culture-item-data.component';

describe('CultureItemDataComponent', () => {
  let component: CultureItemDataComponent;
  let fixture: ComponentFixture<CultureItemDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CultureItemDataComponent]
    });
    fixture = TestBed.createComponent(CultureItemDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
