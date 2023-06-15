import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlendExtDataComponent } from './blend-ext-data.component';

describe('BlendExtDataComponent', () => {
  let component: BlendExtDataComponent;
  let fixture: ComponentFixture<BlendExtDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlendExtDataComponent]
    });
    fixture = TestBed.createComponent(BlendExtDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
