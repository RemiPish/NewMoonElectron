import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CIconDataComponent } from './c-icon-data.component';

describe('CIconDataComponent', () => {
  let component: CIconDataComponent;
  let fixture: ComponentFixture<CIconDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CIconDataComponent]
    });
    fixture = TestBed.createComponent(CIconDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
