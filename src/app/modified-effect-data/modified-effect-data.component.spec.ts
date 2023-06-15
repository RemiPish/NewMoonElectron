import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiedEffectDataComponent } from './modified-effect-data.component';

describe('ModifiedEffectDataComponent', () => {
  let component: ModifiedEffectDataComponent;
  let fixture: ComponentFixture<ModifiedEffectDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifiedEffectDataComponent]
    });
    fixture = TestBed.createComponent(ModifiedEffectDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
