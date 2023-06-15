import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTransformedModelDataComponent } from './c-transformed-model-data.component';

describe('CTransformedModelDataComponent', () => {
  let component: CTransformedModelDataComponent;
  let fixture: ComponentFixture<CTransformedModelDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CTransformedModelDataComponent]
    });
    fixture = TestBed.createComponent(CTransformedModelDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
