import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GvgDataComponent } from './gvg-data.component';

describe('GvgDataComponent', () => {
  let component: GvgDataComponent;
  let fixture: ComponentFixture<GvgDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GvgDataComponent]
    });
    fixture = TestBed.createComponent(GvgDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
