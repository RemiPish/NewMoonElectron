import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarpPointDataComponent } from './warp-point-data.component';

describe('WarpPointDataComponent', () => {
  let component: WarpPointDataComponent;
  let fixture: ComponentFixture<WarpPointDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarpPointDataComponent]
    });
    fixture = TestBed.createComponent(WarpPointDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
