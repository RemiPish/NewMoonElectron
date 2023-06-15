import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevilDataComponent } from './devil-data.component';

describe('DevilDataComponent', () => {
  let component: DevilDataComponent;
  let fixture: ComponentFixture<DevilDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevilDataComponent]
    });
    fixture = TestBed.createComponent(DevilDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
