import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynthesisDataComponent } from './synthesis-data.component';

describe('SynthesisDataComponent', () => {
  let component: SynthesisDataComponent;
  let fixture: ComponentFixture<SynthesisDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SynthesisDataComponent]
    });
    fixture = TestBed.createComponent(SynthesisDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
