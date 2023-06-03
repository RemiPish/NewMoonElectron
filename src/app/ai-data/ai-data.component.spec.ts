import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiDataComponent } from './ai-data.component';

describe('AiDataComponent', () => {
  let component: AiDataComponent;
  let fixture: ComponentFixture<AiDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AiDataComponent]
    });
    fixture = TestBed.createComponent(AiDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
