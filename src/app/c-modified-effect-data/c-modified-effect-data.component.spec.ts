import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CModifiedEffectDataComponent } from './c-modified-effect-data.component';

describe('CModifiedEffectDataComponent', () => {
  let component: CModifiedEffectDataComponent;
  let fixture: ComponentFixture<CModifiedEffectDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CModifiedEffectDataComponent]
    });
    fixture = TestBed.createComponent(CModifiedEffectDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
