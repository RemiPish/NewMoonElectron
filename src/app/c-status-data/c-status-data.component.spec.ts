import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CStatusDataComponent } from './c-status-data.component';

describe('CStatusDataComponent', () => {
  let component: CStatusDataComponent;
  let fixture: ComponentFixture<CStatusDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CStatusDataComponent]
    });
    fixture = TestBed.createComponent(CStatusDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
