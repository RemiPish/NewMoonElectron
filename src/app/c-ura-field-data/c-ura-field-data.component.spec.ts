import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUraFieldDataComponent } from './c-ura-field-data.component';

describe('CUraFieldDataComponent', () => {
  let component: CUraFieldDataComponent;
  let fixture: ComponentFixture<CUraFieldDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CUraFieldDataComponent]
    });
    fixture = TestBed.createComponent(CUraFieldDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
