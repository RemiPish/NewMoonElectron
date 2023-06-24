import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemonMakerComponent } from './demon-maker.component';

describe('DemonMakerComponent', () => {
  let component: DemonMakerComponent;
  let fixture: ComponentFixture<DemonMakerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemonMakerComponent]
    });
    fixture = TestBed.createComponent(DemonMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
