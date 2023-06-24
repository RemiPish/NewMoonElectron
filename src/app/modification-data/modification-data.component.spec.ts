import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationDataComponent } from './modification-data.component';

describe('ModificationDataComponent', () => {
  let component: ModificationDataComponent;
  let fixture: ComponentFixture<ModificationDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificationDataComponent]
    });
    fixture = TestBed.createComponent(ModificationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
