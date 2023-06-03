import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoLiveDataComponent } from './auto-live-data.component';

describe('AutoLiveDataComponent', () => {
  let component: AutoLiveDataComponent;
  let fixture: ComponentFixture<AutoLiveDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoLiveDataComponent]
    });
    fixture = TestBed.createComponent(AutoLiveDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
