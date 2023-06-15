import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CLoadingCommercialDataComponent } from './c-loading-commercial-data.component';

describe('CLoadingCommercialDataComponent', () => {
  let component: CLoadingCommercialDataComponent;
  let fixture: ComponentFixture<CLoadingCommercialDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CLoadingCommercialDataComponent]
    });
    fixture = TestBed.createComponent(CLoadingCommercialDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
