import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertTitleDataComponent } from './expert-title-data.component';

describe('ExpertTitleDataComponent', () => {
  let component: ExpertTitleDataComponent;
  let fixture: ComponentFixture<ExpertTitleDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertTitleDataComponent]
    });
    fixture = TestBed.createComponent(ExpertTitleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
