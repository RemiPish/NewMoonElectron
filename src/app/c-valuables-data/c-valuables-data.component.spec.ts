import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CValuablesDataComponent } from './c-valuables-data.component';

describe('CValuablesDataComponent', () => {
  let component: CValuablesDataComponent;
  let fixture: ComponentFixture<CValuablesDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CValuablesDataComponent]
    });
    fixture = TestBed.createComponent(CValuablesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
