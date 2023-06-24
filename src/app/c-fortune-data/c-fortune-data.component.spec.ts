import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CFortuneDataComponent } from './c-fortune-data.component';

describe('CFortuneDataComponent', () => {
  let component: CFortuneDataComponent;
  let fixture: ComponentFixture<CFortuneDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CFortuneDataComponent]
    });
    fixture = TestBed.createComponent(CFortuneDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
