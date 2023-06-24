import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnchantDataComponent } from './enchant-data.component';

describe('EnchantDataComponent', () => {
  let component: EnchantDataComponent;
  let fixture: ComponentFixture<EnchantDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnchantDataComponent]
    });
    fixture = TestBed.createComponent(EnchantDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
