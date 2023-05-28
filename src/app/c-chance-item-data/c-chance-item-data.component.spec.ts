import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CChanceItemDataComponent } from './c-chance-item-data.component';

describe('CChanceItemDataComponent', () => {
  let component: CChanceItemDataComponent;
  let fixture: ComponentFixture<CChanceItemDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CChanceItemDataComponent]
    });
    fixture = TestBed.createComponent(CChanceItemDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
