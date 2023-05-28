import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CValuableComponent } from './c-valuable.component';

describe('CValuableComponent', () => {
  let component: CValuableComponent;
  let fixture: ComponentFixture<CValuableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CValuableComponent]
    });
    fixture = TestBed.createComponent(CValuableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
