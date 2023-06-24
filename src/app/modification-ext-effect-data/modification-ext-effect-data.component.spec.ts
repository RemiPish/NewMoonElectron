import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationExtEffectDataComponent } from './modification-ext-effect-data.component';

describe('ModificationExtEffectDataComponent', () => {
  let component: ModificationExtEffectDataComponent;
  let fixture: ComponentFixture<ModificationExtEffectDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificationExtEffectDataComponent]
    });
    fixture = TestBed.createComponent(ModificationExtEffectDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
