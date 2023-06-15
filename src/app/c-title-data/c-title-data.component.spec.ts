import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTitleDataComponent } from './c-title-data.component';

describe('CTitleDataComponent', () => {
  let component: CTitleDataComponent;
  let fixture: ComponentFixture<CTitleDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CTitleDataComponent]
    });
    fixture = TestBed.createComponent(CTitleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
