import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlendDataComponent } from './blend-data.component';

describe('BlendDataComponent', () => {
  let component: BlendDataComponent;
  let fixture: ComponentFixture<BlendDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlendDataComponent]
    });
    fixture = TestBed.createComponent(BlendDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
