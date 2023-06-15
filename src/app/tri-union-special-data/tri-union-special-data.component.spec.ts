import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriUnionSpecialDataComponent } from './tri-union-special-data.component';

describe('TriUnionSpecialDataComponent', () => {
  let component: TriUnionSpecialDataComponent;
  let fixture: ComponentFixture<TriUnionSpecialDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TriUnionSpecialDataComponent]
    });
    fixture = TestBed.createComponent(TriUnionSpecialDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
