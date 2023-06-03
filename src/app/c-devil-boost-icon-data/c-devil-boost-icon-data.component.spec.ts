import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDevilBoostIconDataComponent } from './c-devil-boost-icon-data.component';

describe('CDevilBoostIconDataComponent', () => {
  let component: CDevilBoostIconDataComponent;
  let fixture: ComponentFixture<CDevilBoostIconDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CDevilBoostIconDataComponent]
    });
    fixture = TestBed.createComponent(CDevilBoostIconDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
