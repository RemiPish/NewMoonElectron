import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertClassDataComponent } from './expert-class-data.component';

describe('ExpertClassDataComponent', () => {
  let component: ExpertClassDataComponent;
  let fixture: ComponentFixture<ExpertClassDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertClassDataComponent]
    });
    fixture = TestBed.createComponent(ExpertClassDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
