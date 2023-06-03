import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CGuideDataComponent } from './c-guide-data.component';

describe('CGuideDataComponent', () => {
  let component: CGuideDataComponent;
  let fixture: ComponentFixture<CGuideDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CGuideDataComponent]
    });
    fixture = TestBed.createComponent(CGuideDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
