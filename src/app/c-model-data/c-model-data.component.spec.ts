import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CModelDataComponent } from './c-model-data.component';

describe('CModelDataComponent', () => {
  let component: CModelDataComponent;
  let fixture: ComponentFixture<CModelDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CModelDataComponent]
    });
    fixture = TestBed.createComponent(CModelDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
