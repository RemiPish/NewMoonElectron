import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopMakerComponent } from './shop-maker.component';

describe('ShopMakerComponent', () => {
  let component: ShopMakerComponent;
  let fixture: ComponentFixture<ShopMakerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopMakerComponent]
    });
    fixture = TestBed.createComponent(ShopMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
