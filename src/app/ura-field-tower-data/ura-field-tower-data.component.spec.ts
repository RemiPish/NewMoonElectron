import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UraFieldTowerDataComponent } from './ura-field-tower-data.component';

describe('UraFieldTowerDataComponent', () => {
  let component: UraFieldTowerDataComponent;
  let fixture: ComponentFixture<UraFieldTowerDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UraFieldTowerDataComponent]
    });
    fixture = TestBed.createComponent(UraFieldTowerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
