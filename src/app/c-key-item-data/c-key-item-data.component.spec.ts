import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CKeyItemDataComponent } from './c-key-item-data.component';

describe('CKeyItemDataComponent', () => {
  let component: CKeyItemDataComponent;
  let fixture: ComponentFixture<CKeyItemDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CKeyItemDataComponent]
    });
    fixture = TestBed.createComponent(CKeyItemDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
