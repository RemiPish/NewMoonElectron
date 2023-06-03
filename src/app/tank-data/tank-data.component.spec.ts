import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankDataComponent } from './tank-data.component';

describe('TankDataComponent', () => {
  let component: TankDataComponent;
  let fixture: ComponentFixture<TankDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TankDataComponent]
    });
    fixture = TestBed.createComponent(TankDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
