import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopProductDataComponent } from './shop-product-data.component';

describe('ShopProductDataComponent', () => {
  let component: ShopProductDataComponent;
  let fixture: ComponentFixture<ShopProductDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopProductDataComponent]
    });
    fixture = TestBed.createComponent(ShopProductDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
