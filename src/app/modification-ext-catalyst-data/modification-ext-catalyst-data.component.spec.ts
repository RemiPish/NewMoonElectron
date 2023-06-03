import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationExtCatalystDataComponent } from './modification-ext-catalyst-data.component';

describe('ModificationExtCatalystDataComponent', () => {
  let component: ModificationExtCatalystDataComponent;
  let fixture: ComponentFixture<ModificationExtCatalystDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificationExtCatalystDataComponent]
    });
    fixture = TestBed.createComponent(ModificationExtCatalystDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
