import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CItemDataComponent } from './c-item-data.component';

describe('CItemDataComponent', () => {
  let component: CItemDataComponent;
  let fixture: ComponentFixture<CItemDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CItemDataComponent]
    });
    fixture = TestBed.createComponent(CItemDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
