import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationExtRecipeDataComponent } from './modification-ext-recipe-data.component';

describe('ModificationExtRecipeDataComponent', () => {
  let component: ModificationExtRecipeDataComponent;
  let fixture: ComponentFixture<ModificationExtRecipeDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificationExtRecipeDataComponent]
    });
    fixture = TestBed.createComponent(ModificationExtRecipeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
